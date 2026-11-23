# UHAKI LEGAL ASSISTANT SYSTEM

## Technical Report

## 1. Executive Summary

Uhaki is a retrieval-augmented generation (RAG) chatbot designed to make information from Kenyan legislation more accessible. It allows users to submit legal questions and receive grounded in a colle.

The system was developed using 20 selected Acts of Parliament, including the Constitution of Kenya. The legal documents were cleaned, converted into structured JSON, divided into section-based overlapping chunks, embedded using `intfloat/e5-base-v2`, and stored in ChromaDB.

At query time, Uhaki converts the user's question into an embedding, retrieves candidate legal passages from ChromaDB, reranks them using a cross-encoder, and supplies the highest-ranked passages to a language model to generate an explanation.

The retrieval experiments were conducted using a manually curated dataset of 300 legal questions with corresponding relevant Acts and sections. The best completed and valid experimental configuration, Trial 5, achieved:

- Act-level Recall\@6: **85.33%**
- Act-level MRR\@6: **0.7043**
- Act-level Precision\@6: **0.1422**

A separate answer-quality evaluation used 322 question-and-answer pairs. It reported a mean semantic similarity score of 0.8895, mean NLI entailment probability of 0.7992, and a role-match rate of 95.96%. These measurements provide indicative evidence of semantic alignment and consistency, but they do not establish the legal correctness of generated answers.

The original answer-generation implementation used Qwen3-8B-Instruct through a notebook-based API exposed using ngrok. The generation component was subsequently moved to Groq-hosted models to support deployment. During the latest model comparison, Qwen and GPT-OSS were tested using the same question and retrieved legal context. This allowed their generation behaviour to be compared while keeping retrieval constant.

The project demonstrates the integration of document preprocessing, semantic retrieval, neural reranking, language-model generation, and evaluation in an applied legal-information system.

---

## 2. System Overview and Architecture

### 2.1 System objective

The main objective of Uhaki is to help users understand relevant Kenyan legal provisions without having to interpret lengthy legislative documents themselves.

The system is designed to:

- Accept natural-language legal questions.
- Identify potentially relevant provisions from the selected Kenyan legal corpus.
- Rank retrieved passages according to their relevance to the question.
- Generate a concise explanation in accessible language.
- Identify the relevant Act and section references.

Uhaki is an information-retrieval and explanation tool. Its responses should not be treated as a substitute for professional legal advice.

### 2.2 Technology stack

| Component       | Technology                             |
| --------------- | -------------------------------------- |
| Frontend        | React                                  |
| Backend         | Python, Flask                          |
| Embedding model | `intfloat/e5-base-v2`                  |
| Vector database | ChromaDB                               |
| Reranking model | `cross-encoder/ms-marco-MiniLM-L-6-v2` |
| Language model  | Qwen / Groq-hosted LLM configurations  |
| Data processing | Python                                 |
| Logging         | Python logging and CSV                 |
| Translation     | `deep-translator`                      |

The system uses pretrained models rather than training its own embedding, reranking, or generative model from scratch.

### 2.3 End-to-end processing pipeline

The current Flask application follows this general sequence:

1. A user submits a question through the React interface.
2. The backend receives the question.
3. Where the Swahili processing path is invoked, the question is translated into English before retrieval.
4. The question is encoded using E5 embeddings.
5. ChromaDB retrieves the 12 highest-ranked candidate chunks using dense vector search.
6. The cross-encoder reranker evaluates the candidates against the question.
7. The reranked results are ordered using a combined cross-encoder and dense-retrieval score.
8. The five highest-ranked chunks are assembled into the legal context.
9. The language model receives the question and retrieved context and generates a natural-language response.
10. The backend returns the response and records query information for logging.

The retrieval and generation components are separate. This makes it possible to change the answer-generation model without changing the embedding model or vector database.

---

## 3. Legal Corpus Preparation

### 3.1 Data collection

The legal corpus was obtained from the Kenya Law website. Twenty Acts of Parliament were selected for the project, including the Constitution of Kenya.

The selection was informed by research into common legal questions and consultation with a lawyer about the types of legal issues members of the public frequently encounter.

The original documents were in PDF format. These documents contained legislative text alongside formatting elements and publication information that were not useful for semantic retrieval.

The corpus therefore required cleaning and restructuring before it could be embedded.

### 3.2 Text extraction and cleaning

The documents were converted into UTF-8 encoded plain-text files.

The preprocessing process addressed inconsistencies such as:

- Repeated headers and footers.
- Kenya Gazette publication information and other boilerplate.
- Cover-page metadata and publication details.
- Page numbers and unnecessary line breaks.
- Excess whitespace and inconsistent indentation.
- Broken characters and other text-extraction artefacts.
- Duplicate section headings appearing in document indexes.
- Formatting elements that did not contribute to the substantive legal content.

The objective was to retain the actual legal provisions while removing elements that could introduce noise into retrieval.

### 3.3 Structuring the legal documents

The cleaned text was converted into structured JSON files.

The preprocessing pipeline identified the organisation of the legislation, including the Act, its parts, and individual sections. This provided a consistent representation of the legal documents and made it possible to associate each passage with its original location.

The structured data preserved information such as:

- Act name.
- Part or structural division.
- Section label.
- Section number.
- Section title.
- Section path.
- Legal text.

This structure was important because the meaning of a retrieved passage depends partly on its location within the original legislation.

### 3.4 Chunking strategy

An initial approach based primarily on fixed word lengths did not preserve legal structure effectively. It could separate related provisions and produce passages that contained only part of a legal idea.

The chunking strategy was therefore redesigned to respect the structure of the legislation.

The current preprocessing pipeline:

- Identifies legal sections and their associated content.
- Divides longer sections into smaller overlapping chunks.
- Preserves section-level metadata for each chunk.
- Records the position of each chunk within its section.
- Maintains references to preceding and following chunks.

The current chunking configuration uses:

| Parameter            |                  Configuration |
| -------------------- | -----------------------------: |
| Maximum chunk length | 220 whitespace-separated words |
| Overlap              |                       80 words |
| Minimum chunk length |                       60 words |

These are word-based limits, not model-token limits.

The overlap helps preserve context where a section must be divided into multiple chunks. The section metadata also allows retrieved text to be traced back to its original Act and provision.

### 3.5 Embedding generation

The cleaned and structured legal chunks are embedded using:

`intfloat/e5-base-v2`

E5-base-v2 produces 768-dimensional embeddings.

The document-embedding process uses the `passage:` prefix, while user queries use the `query:` prefix. Embeddings are normalized before being stored or used for retrieval.

The maximum sequence length configured in the application is 512 tokens.

The embedding model is pretrained. No new embedding model was trained specifically for Uhaki.

### 3.6 Vector database and metadata

The embeddings and associated metadata are stored in ChromaDB.

The application uses the collection:

`actSectionsV2`

The database inspected during development contained approximately 3,921 records.

Each record contains the legal text and metadata needed to identify its source and position in the corpus. The metadata includes:

| Attribute        | Description                              |
| ---------------- | ---------------------------------------- |
| `act`            | Name of the source Act                   |
| `part`           | Structural division within the Act       |
| `section`        | Full section label                       |
| `section_number` | Section identifier                       |
| `section_title`  | Section heading                          |
| `section_path`   | Position within the Act hierarchy        |
| `chunk_index`    | Position of the chunk within its section |
| `chunk_id`       | Unique chunk identifier                  |
| `text`           | Actual legal passage                     |
| `prev_chunk_id`  | Identifier of the preceding chunk        |
| `next_chunk_id`  | Identifier of the following chunk        |

An example of the structured representation is:

```json
{
  "act": "Constitution of Kenya",
  "part": "General",
  "section": "7 – National, official and other languages",
  "section_number": "7",
  "section_title": "National, official and other languages",
  "section_path": "General > 7",
  "chunk_index": 1,
  "chunk_id": 8,
  "text": "(1) The national language of the Republic is Kiswahili...",
  "prev_chunk_id": 7,
  "next_chunk_id": 9,
  "act_year": null
}
```

The ChromaDB collection was configured with the L2 distance metric. Therefore, the current implementation should be described as using dense vector retrieval based on L2 distance, rather than claiming that ChromaDB directly performs cosine-similarity search.

---

## 4. Retrieval and Reranking Architecture

### 4.1 Dense retrieval

At query time, the user's question is encoded using the same E5 embedding model used during document preparation.

The query embedding is generated using the `query:` prefix and normalized before being passed to ChromaDB.

The current Flask application retrieves the top 12 candidate chunks from the `actSectionsV2` collection.

This first retrieval stage is intended to identify a broad set of potentially relevant legal passages.

### 4.2 Cross-encoder reranking

Dense retrieval alone may return passages that are semantically similar to a question but do not directly address the legal issue.

To improve the ordering of retrieved passages, Uhaki uses:

`cross-encoder/ms-marco-MiniLM-L-6-v2`

Unlike the embedding model, which represents the question and legal passage independently, the cross-encoder evaluates a question and candidate passage together.

For each candidate, the model produces a relevance score based on the relationship between the question and the passage.

The implementation includes:

- Loading the reranker locally where available, with a Hugging Face fallback.
- Using CUDA when available and CPU otherwise.
- Processing candidate question-passage pairs in batches.
- Trimming long passages before scoring, retaining the beginning and end of the text.
- Normalising cross-encoder and dense scores before combining them.

If the cross-encoder encounters an error, the application has a fallback path that preserves the original dense-retrieval order.

### 4.3 Combined scoring

The current reranker combines the normalised cross-encoder score and the normalised dense-retrieval score.

The configured weighting is:

[
S\_{\text{combined}} =
0.8S\_{\text{cross-encoder}} +
0.2S\_{\text{dense}}
]

The cross-encoder therefore contributes 80% of the combined score, while the original dense-retrieval score contributes 20%.

The implementation uses a configurable environment variable, `CE_FUSION_ALPHA`, with a default value of 0.8. An environment setting can override this default.

This configuration is intended to give greater importance to the cross-encoder's direct assessment of the question-passage relationship while retaining information from the initial retrieval ranking.

### 4.4 Context selection

After reranking, the current Flask application selects the five highest-ranked chunks.

These chunks are assembled into the context supplied to the language model.

The distinction between the candidate pool and the generation context is important:

- Initial dense retrieval: 12 chunks.
- Reranking: 12 candidate chunks.
- Context supplied to the generator: 5 chunks.

The current application therefore uses five final context chunks, rather than the six described in the earlier report.

---

## 5. Retrieval Experiments

### 5.1 Evaluation dataset

A manually curated dataset of 300 legal questions was created to evaluate retrieval performance.

Each question was associated with relevant Acts and sections, which served as ground truth for evaluating the retrieval results.

The experiments investigated different approaches to matching legal questions with the relevant legislative provisions.

The evaluation process also required normalising section labels and parsing retrieved results consistently so that different representations of the same legal provision could be compared.

### 5.2 Experimental progression

Six retrieval trials were explored. The experiments progressively investigated dense retrieval, BM25 retrieval, heading-based signals, Act-level priors, candidate-pool sizes, and reranking weights.

**Trial 1: Dense retrieval and reranking**

The initial experiment used ChromaDB dense retrieval followed by cross-encoder reranking.

The evaluation used exact Act and section matching, with basic parsing of the retrieved results.

**Trial 2: Adding BM25 retrieval**

BM25 retrieval over the full legal text was introduced alongside dense retrieval.

The purpose was to investigate whether keyword-based retrieval could improve results for legal questions containing terminology that also appeared in the legislation.

**Trial 3: Improved result normalisation and heading signals**

The evaluation pipeline was improved to handle section numbers and headings more consistently.

The retrieval experiments also introduced heading-based relevance adjustments and Act-level priors. These changes were intended to help distinguish between similar legal provisions and favour more relevant legislative sources.

**Trial 4: Retrieval weighting and candidate selection**

The experiment adjusted the relative contribution of dense and BM25 retrieval and explored a larger reranking candidate pool.

It also investigated Act gating and softer heading penalties.

**Trial 5: Separate document and heading BM25 signals**

The fifth experiment used three retrieval signals:

- BM25 over the full legal text.
- BM25 over section headings.
- Dense retrieval using E5 embeddings.

The signals were combined before reranking.

The Trial 5 configuration used the following retrieval weights:

| Retrieval signal | Weight |
| ---------------- | -----: |
| Full-text BM25   |   0.40 |
| Heading BM25     |   0.30 |
| Dense retrieval  |   0.30 |

Trial 5 produced the strongest valid results among the completed experiments.

**Trial 6: Further retrieval tuning**

Trial 6 explored changes to the candidate pool and retrieval weighting. It also adjusted the relative contributions of document BM25, heading BM25 and dense retrieval, while retaining a strong reranking contribution.

However, the evaluation code for Trial 6 referenced the Trial 5 evaluation file. Consequently, the Trial 6 results cannot be treated as a valid independent evaluation of the changed configuration.

Trial 5 is therefore used as the best completed experimental result in this report.

### 5.3 Important distinction between experiments and the current application

The experimental retrieval pipeline and the current Flask application should not be treated as identical.

Trial 5 investigated a hybrid retrieval approach involving two BM25 signals and dense retrieval before reranking.

The current Flask application's reviewed query path uses dense retrieval from ChromaDB, followed by cross-encoder and dense-score fusion in the reranker.

The Trial 5 metrics therefore describe the experimental hybrid retrieval configuration. They should not be presented as a direct benchmark of the current Flask application's dense-retrieval pipeline.

---

## 6. Language Model Integration and Answer Generation

### 6.1 Original generation implementation

The original generation component used:

`Qwen/Qwen3-8B-Instruct`

The model was run through a notebook environment and exposed to the Flask backend using an ngrok tunnel.

This allowed the backend to send the question and retrieved legal context to the remotely hosted model without requiring the model to run directly on the local development machine.

The approach enabled initial integration, but it introduced operational limitations associated with maintaining the notebook environment and the external tunnel.

### 6.2 Migration to hosted inference

To support a more practical deployment arrangement, generation was moved to Groq's hosted inference API.

During this transition, different hosted models were tested, including Llama 3.3 70B and GPT-OSS 120B.

The latest comparison also tested Qwen through Groq. This is a separate hosted model configuration from the original Qwen3-8B-Instruct notebook implementation and should not be described as the same model.

In the latest qualitative comparison, Qwen and GPT-OSS received the same question and the same five retrieved legal chunks. This kept the retrieval context constant and allowed the differences in their generated responses to be examined.

The model comparison was qualitative. It was not a large-scale statistical benchmark of the two models.

### 6.3 Generation prompt

The reviewed Flask implementation constructs a prompt that identifies the assistant as a Kenyan legal assistant and instructs the model to explain legal provisions in simple, human-readable English.

The prompt includes instructions to:

- Avoid copying legal text verbatim.
- Explain legal provisions in simpler language.
- Keep responses short and clear.
- Use bullet points where helpful.
- Explain the practical meaning of the law.
- Simplify complex legal material.
- Cite the Act and section at the end.

The prompt is followed by the retrieved legal context and the user's question.

The prompt encourages explanations based on retrieved material. However, it does not contain all the explicit grounding and hallucination-prevention rules described in the earlier report. It should therefore not be claimed that the current prompt guarantees that the model answers exclusively from the supplied context.

### 6.4 Qualitative comparison: Qwen and GPT-OSS

A question concerning lawful termination of employment and unfair dismissal under Kenyan law was used to compare the two generators.

Both models received the same five retrieved chunks. This made it possible to compare their generation behaviour without changing the retrieval results.

**Qwen's response**

Qwen produced a detailed, conversational explanation. It organised the answer into employer obligations, employee rights, complaint procedures and practical next steps.

It explained the legal provisions in accessible language, but some statements required further legal qualification. In particular, its explanation of the three-month complaint period was too broad, and its description of compatibility and the burden of proof needed greater precision.

**GPT-OSS's response**

GPT-OSS produced a shorter, more structured response. It followed the statutory categories more closely and distinguished the Labour Officer route from court action.

However, it also simplified certain legal concepts and made some statements too categorically. Its explanation of the burden of proof and the 13-month service requirement needed further qualification. It also referred to possible remedies without retrieving the relevant provisions governing those remedies.

**Comparison observations**

| Criterion                  | Qwen                                      | GPT-OSS                                             |
| -------------------------- | ----------------------------------------- | --------------------------------------------------- |
| Plain-language explanation | Conversational and detailed               | Concise and structured                              |
| Organisation               | Clear sections and practical explanations | Clear bullet-point structure                        |
| Statutory alignment        | Some overgeneralisation                   | Closer to the structure of the retrieved provisions |
| Legal precision            | Requires improvement                      | Requires improvement                                |
| Completeness               | Includes additional explanations          | Omits some relevant provisions                      |
| Unsupported elaboration    | More noticeable                           | Less noticeable in this example                     |

The comparison illustrates that readable responses are not necessarily legally accurate responses. Both models require evaluation for legal grounding, completeness, correct interpretation and appropriate qualification.

Because this comparison involved one question, it should be treated as a qualitative example rather than evidence that one model is generally more accurate than the other.

---

## 7. Evaluation

### 7.1 Retrieval evaluation metrics

Retrieval performance was evaluated using the following metrics:

**Hit\@k**

Measures whether a relevant result appears within the first k retrieved results.

**Precision\@k**

Measures the proportion of the top k retrieved results that are relevant.

**Recall\@k**

Measures the proportion of all relevant results that appear within the top k retrieved results.

**Mean Reciprocal Rank (MRR)**

Measures how highly the first relevant result appears in the ranked results.

For a query, the reciprocal rank is the inverse of the rank of the first relevant result. MRR is the average reciprocal rank across all queries.

Higher recall indicates that more relevant material is retrieved, while higher MRR indicates that relevant material tends to appear nearer the top of the ranking.

### 7.2 Act-level retrieval results

The following table presents the Act-level results from Trials 1–5.

| Trial   | Act Precision\@6 | Act Recall\@6 | Act MRR\@6 |
| ------- | ---------------: | ------------: | ---------: |
| Trial 1 |           0.1383 |        0.8300 |     0.6665 |
| Trial 2 |           0.1394 |        0.8367 |     0.7008 |
| Trial 3 |           0.1133 |        0.6800 |     0.6159 |
| Trial 4 |           0.1300 |        0.7800 |     0.6162 |
| Trial 5 |       **0.1422** |    **0.8533** | **0.7043** |

Trial 5 achieved the highest Act-level Recall\@6 and MRR\@6 among these completed trials.

Its results indicate that the relevant Act was retrieved within the top six results for approximately 85.33% of the evaluated questions, with an average reciprocal rank of 0.7043.

### 7.3 Section-level retrieval results

Act-level retrieval and section-level retrieval measure different things.

A system can identify the correct Act without necessarily retrieving the exact section needed to answer a question.

The Trial 5 section-level results were:

| Metric | Result |
| ------ | -----: |
| Hit\@1 | 0.2400 |
| Hit\@3 | 0.3867 |
| Hit\@6 | 0.4300 |
| MRR\@6 | 0.3148 |

These results show that identifying the correct Act was considerably easier than consistently retrieving the exact relevant section.

This distinction is important for a legal-information system because the correct Act alone may not contain enough information to answer a specific legal question. Accurate section-level retrieval remains an important area for improvement.

### 7.4 Interpretation of Precision\@6

Trial 5 recorded an Act-level Precision\@6 of 0.1422.

This relatively low value must be interpreted in the context of the evaluation setup. The evaluation often had one relevant Act per question while the system returned six candidates.

Where there is only one relevant Act, retrieving that Act among six results produces a maximum per-query precision of 1/6.

Precision and recall therefore measure different aspects of this retrieval task. The relatively high Act-level recall alongside lower precision indicates that the correct Act was frequently retrieved, but several additional candidates were also returned.

### 7.5 Answer-quality evaluation

Answer generation was evaluated separately using a set of 322 question-and-answer pairs.

The evaluation included:

| Metric                     |   Mean |         Median |
| -------------------------- | -----: | -------------: |
| Semantic similarity        | 0.8895 |         0.8923 |
| NLI entailment probability | 0.7992 |         0.9764 |
| Role-match rate            | 95.96% | Not applicable |

**Semantic similarity**

Semantic similarity was used to estimate the degree of semantic alignment between the question and generated answer.

The mean score was 0.8895, with a median of 0.8923.

This indicates that generated answers were generally semantically related to the questions. However, similarity to a question does not establish whether an answer is legally correct or sufficiently supported by legislation.

**Natural Language Inference**

An NLI model was used to calculate entailment probabilities for generated answers.

The mean probability was 0.7992, while the median was 0.9764.

These values should be interpreted cautiously. The evaluation setup compared generated answers with questions, rather than directly establishing whether each legal claim was supported by the retrieved statutory passages. Consequently, the score should not be described as a measure of legal factual correctness or verified legal grounding.

**Role-match rate**

The role-match metric used a heuristic to assess whether responses remained consistent with the intended role of a Kenyan legal assistant.

The reported rate was 95.96%.

This is an indication of role consistency under the evaluation method used. It does not establish the accuracy of the legal information in the responses.

### 7.6 Limitations of the evaluation

The evaluation provides useful evidence about retrieval behaviour and response characteristics, but it has limitations.

- Act-level retrieval performance is stronger than section-level retrieval performance.
- The Trial 5 metrics describe an experimental hybrid retrieval configuration, not a direct benchmark of the current Flask application's dense-retrieval pipeline.
- Trial 6 results cannot be relied upon because the evaluation code referenced the Trial 5 results file.
- Semantic similarity does not measure legal correctness.
- NLI entailment probability, as configured, does not establish that generated legal claims are supported by the retrieved law.
- The role-match metric is heuristic and does not assess the substantive accuracy of responses.
- The qualitative comparison between Qwen and GPT-OSS used one example and cannot establish general model superiority.

Future evaluation should include direct assessment of whether individual legal claims are supported by the retrieved provisions, whether relevant sections are omitted, whether the system appropriately acknowledges missing information, and whether it avoids unsupported legal conclusions.

---

## 8. Challenges and Design Decisions

### 8.1 Legal document structure

**Challenge**

The initial chunking approach did not adequately preserve the structure of legal documents. Fixed-length splitting could separate related provisions and remove important context.

**Response**

The preprocessing pipeline was redesigned to identify Acts, parts and sections before dividing longer sections into overlapping chunks. Metadata and links between adjacent chunks were retained.

**Outcome**

The revised approach made it possible to preserve the relationship between retrieved passages and their original legal provisions.

### 8.2 Inconsistent source formatting

**Challenge**

The original PDF documents contained inconsistent formatting, repeated publication information, and text-extraction artefacts.

**Response**

The documents were cleaned and converted into structured text and JSON representations before embedding.

**Outcome**

The resulting corpus provided a more consistent basis for retrieval and source identification.

### 8.3 Similar legal provisions

**Challenge**

Different provisions may use similar terminology while addressing different legal issues. Dense retrieval can therefore return passages that are related in wording but not sufficiently relevant to the question.

**Response**

The project explored BM25 retrieval, heading-based signals, Act-level priors and cross-encoder reranking.

**Outcome**

The experiments demonstrated the value of testing multiple retrieval strategies rather than relying on embedding similarity alone. Trial 5 produced the strongest completed experimental Act-level results.

### 8.4 Converting legislation into accessible explanations

**Challenge**

Retrieved legislation is often written in formal legal language, making it difficult for users without legal training to interpret.

**Response**

A language model was integrated to explain retrieved provisions in simpler language and organise responses into readable sections.

**Outcome**

The system could produce more accessible explanations than simply returning the original legislative text. However, the qualitative comparison showed that generated explanations still require legal accuracy checks.

### 8.5 Model hosting and integration

**Challenge**

The original Qwen3-8B-Instruct implementation depended on a notebook-based environment exposed through ngrok. This created operational limitations for a continuously available application.

**Response**

The generation component was migrated to hosted inference through Groq, allowing the Flask backend to call a hosted language model.

**Outcome**

The architecture became less dependent on maintaining a locally hosted notebook model. Different hosted models could also be compared without rebuilding the retrieval pipeline.

### 8.6 Retrieval and generation evaluation

**Challenge**

A response can be readable and relevant to a question while still containing an inaccurate legal interpretation. Retrieval performance alone cannot establish answer quality.

**Response**

The project evaluated retrieval and generated responses separately, using retrieval metrics, semantic similarity, NLI probabilities and role matching.

**Outcome**

The evaluation highlighted the need to distinguish retrieval success, semantic alignment and actual legal correctness. It also identified limitations in the existing answer-quality metrics.

---

## 9. Current System Limitations and Future Work

The current implementation provides a working RAG pipeline, but several areas require further development.

### 9.1 Section-level retrieval

The difference between Act-level and section-level results indicates that the system still needs to improve its ability to identify the precise provision relevant to a question.

Further work could investigate improved section-level relevance labels, retrieval strategies and evaluation methods.

### 9.2 Legal grounding and answer verification

The current generation prompt encourages simple explanations but does not guarantee that every statement is supported by the retrieved context.

Future improvements should include:

- Checking whether individual legal claims are supported by retrieved passages.
- Identifying when the available context is insufficient.
- Avoiding unsupported conclusions.
- Improving citation completeness.
- Evaluating whether answers distinguish between statutory requirements, exceptions and procedural conditions.

### 9.3 Retrieval and generation consistency

The Trial 5 hybrid retrieval results should not be assumed to represent the current deployed Flask pipeline.

A future evaluation should run the current dense-retrieval and reranking configuration against the same labelled question dataset so that its performance can be measured independently.

### 9.4 Language support

The application includes an English/Swahili interaction path, with translation functionality in the backend.

However, the reviewed frontend request does not currently pass the selected language to the backend. The language-selection integration therefore needs to be checked and corrected before full bilingual functionality can be claimed.

### 9.5 Source and corpus maintenance

The current corpus contains a selected set of 20 Acts. It does not represent every Kenyan statute or guarantee that all legislative amendments are reflected.

Future development should include a process for updating legislation, tracking source versions and identifying provisions that have been amended or repealed.

### 9.6 Operational reliability

Further work is also needed around configuration consistency, error handling, deployment monitoring and access to the application.

In particular, the generator configuration and backend status reporting should accurately reflect the inference route actually being used.

---

## 10. Conclusion

Uhaki demonstrates how retrieval-augmented generation can be applied to make Kenyan legal information more accessible.

The project involved preparing a structured legal corpus, developing an embedding-based retrieval pipeline, experimenting with different retrieval and reranking strategies, integrating language models, and evaluating the system using manually curated legal questions.

The completed Trial 5 retrieval experiment achieved an Act-level Recall\@6 of 85.33% and an MRR\@6 of 0.7043. However, the lower section-level retrieval results show that identifying the correct Act does not always mean retrieving the exact provision required.

The answer-quality evaluation and subsequent Qwen/GPT-OSS comparison also highlighted an important limitation of language-model-based legal assistance: a response can be clear and well organised without being fully accurate or legally complete.

Overall, the project provided practical experience in designing, implementing and evaluating an applied AI system. It also demonstrated the importance of examining how data preparation, retrieval, reranking and language generation interact, and of evaluating AI outputs against the requirements of the domain in which the system is used.
