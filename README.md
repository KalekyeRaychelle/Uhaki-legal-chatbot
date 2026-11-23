# Uhaki – Kenyan Legal Information Chatbot

Uhaki is an AI-powered legal information chatbot designed to make Kenyan legislation easier to understand and access. It allows users to ask questions about selected Kenyan laws and receive simplified explanations based on relevant legal provisions.

The project uses Retrieval-Augmented Generation (RAG) to retrieve relevant sections from a collection of Kenyan Acts before passing that context to a language model to generate a response.

**Note:** Uhaki provides legal information for educational and informational purposes only. It does not provide legal advice or replace consultation with a qualified legal professional.

## Features

- **Natural-language questions:** Ask questions about selected Kenyan laws using everyday language.
- **Legal document retrieval:** Retrieves relevant sections from a collection of Kenyan Acts to provide context for responses.
- **Simplified explanations:** Uses a language model to explain legal provisions in more accessible language.
- **Retrieval and reranking:** Uses semantic search and a cross-encoder reranker to improve the relevance of retrieved legal passages.
- **Web-based interface:** Provides a React frontend for interacting with the chatbot.
- **English and Swahili interface options:** Includes language-related functionality in the application. The end-to-end language selection flow is still being verified.

## How It Works

Uhaki follows a Retrieval-Augmented Generation (RAG) approach.

1. A user submits a legal question through the chatbot interface.
2. The backend converts the question into an embedding using the `intfloat/e5-base-v2` model.
3. ChromaDB retrieves an initial set of relevant legal passages.
4. A cross-encoder reranker (`cross-encoder/ms-marco-MiniLM-L-6-v2`) scores the retrieved passages alongside their dense retrieval scores.
5. The combined ranking is used to select the most relevant passages.
6. The selected passages are included as context in a request to the language model.
7. The generated explanation is returned to the frontend and displayed to the user.

The current retrieval pipeline retrieves 12 candidates and selects up to 5 passages for the generation context.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React |
| Backend | Python, Flask |
| Embedding model | `intfloat/e5-base-v2` |
| Vector database | ChromaDB |
| Reranker | `cross-encoder/ms-marco-MiniLM-L-6-v2` |
| Language model integration | Groq API |
| Retrieval approach | Dense retrieval with cross-encoder reranking |

## Legal Document Collection

Uhaki uses a collection of 20 selected Kenyan Acts of Parliament.

The documents are processed into structured sections and smaller text chunks before being embedded and stored in ChromaDB. This allows the application to retrieve relevant legal passages instead of sending entire Acts to the language model.

The current ChromaDB collection is named `actSectionsV2`.

## Project Structure

The repository is organised into frontend, backend and data-related components.

```text
Uhaki-legal-chatbot/
│
├── backend/
│   ├── Flask application and API
│   ├── Retrieval and reranking components
│   └── Supporting backend modules
│
├── frontend/
│   ├── React application
│   ├── Landing page
│   └── Chat interface
│
├── data/
│   └── Legal document data and related resources
│
└── README.md
```

The exact contents of each directory may change as development continues.

## Getting Started

### Prerequisites

Before running Uhaki, ensure you have:

- Python installed.
- Node.js and npm installed.
- Access to the Groq API.
- The project's legal document data and ChromaDB vector database.

### 1. Clone the repository

```bash
git clone https://github.com/KalekyeRaychelle/Uhaki-legal-chatbot.git
cd Uhaki-legal-chatbot
```

### 2. Set up the backend

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
```

Install the backend dependencies using the dependency file included in the repository.

Configure the Groq API credentials using the environment variable expected by the backend. Do not commit API keys or other secrets to version control.

Start the Flask application using its configured entry point.

### 3. Set up the frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend should connect to the Flask backend using the API configuration specified in the project.

*The exact dependency filenames, environment variables, startup commands and frontend API URL should be checked against the current repository configuration before following these instructions.*

## API

The Flask backend exposes an endpoint for submitting legal questions:

### `POST /askQuery`

**Request body:**

```json
{
  "query": "What does the Employment Act say about unfair termination?"
}
```

The endpoint processes the question through the retrieval and generation pipeline and returns the chatbot's response.

## Limitations

- The chatbot's knowledge is limited to the legal documents included in its collection.
- Retrieved passages and generated explanations may not always fully address a user's circumstances.
- Language-model responses can contain inaccuracies and should be checked against the relevant legislation.
- The application is not a substitute for professional legal advice.
- Retrieval quality depends on the relevance and coverage of the available legal documents.

## Future Improvements

Potential areas for further development include:

- Expanding the collection of Kenyan legislation.
- Improving retrieval and answer evaluation.
- Strengthening source attribution and links to original legal provisions.
- Improving handling of questions that cannot be answered from the available documents.
- Completing and testing the end-to-end Swahili interaction flow.
- Improving deployment, reliability and performance.

## Disclaimer

Uhaki is an academic and development project intended to improve access to legal information. Its responses are generated automatically and may not reflect the latest amendments, judicial interpretations or the specific circumstances of a legal matter.

Always refer to the official legislation and consult a qualified legal professional when making legal decisions.
