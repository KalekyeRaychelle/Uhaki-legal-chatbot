import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../Styles/MessageList.css";
import robotLogo from "../Assets/robotlogo.webp";

const MessageList = ({ messages = [], isTyping = false, onPromptClick }) => {
  const listRef = useRef(null);
  const [sourcesModal, setSourcesModal] = useState(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const openSourcesModal = (message) => {
    if (message.sources && message.sources.length > 0) {
      setSourcesModal(message);
    }
  };

  const closeModal = () => setSourcesModal(null);

  return (
    <div ref={listRef} className="message-list-container">
      {messages.map((m, index) => {
        const hasSources = Array.isArray(m.sources) && m.sources.length > 0;
        const isFirstUhakiMessage = m.sender === "uhaki" && index === 0;
        return (
          <div key={m.id} className={`message-row ${m.sender}`}>
            {m.sender === "uhaki" && (
              <div className="avatar" aria-hidden="true">
                <img src={robotLogo} alt="Uhaki" />
              </div>
            )}

            <div className="message-content">
              <div className={`bubble ${m.sender}`}>
                <div className="bubble-text">
                  <ReactMarkdown
                    skipHtml
                    components={{
                      a: ({ node, children, ...props }) => (
                        <a {...props} target="_blank" rel="noreferrer">
                          {children}
                        </a>
                      )
                    }}
                  >
                    {m.text || ""}
                  </ReactMarkdown>
                </div>
                {m.time && <div className="bubble-meta">{m.time}</div>}
              </div>

              {m.sender === "uhaki" && hasSources && (
                <div className="source-chip-row">
                  {m.sources.slice(0, 3).map((src, idx) => (
                    <button
                      type="button"
                      className="source-chip"
                      key={`${m.id}-source-${idx}`}
                      onClick={() => openSourcesModal(m)}
                    >
                      {src.act || "Source"} {src.section ? `- ${src.section}` : ""}
                    </button>
                  ))}
                </div>
              )}

             
              {m.sender === "uhaki" && !hasSources && !isFirstUhakiMessage && (
                <div className="bubble-actions">
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={(e) => {
                      navigator.clipboard.writeText(m.text || "");
                      const btn = e.currentTarget;
                      const oldText = btn.innerText;
                      btn.innerText = "Copied!";
                      setTimeout(() => (btn.innerText = oldText), 1000);
                    }}
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {isTyping && (
        <div className="message-row uhaki">
          <div className="avatar" aria-hidden="true" />
          <div className="bubble typing-bubble">
            <div className="typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        </div>
      )}

      {sourcesModal && (
        <div className="sources-overlay" onClick={closeModal}>
          <div
            className="sources-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              &times;
            </button>
            <h3>Sources used</h3>
            <ol>
              {sourcesModal.sources.map((src, idx) => (
                <li key={`${sourcesModal.id}-modal-${idx}`}>
                  <div className="source-title">
                    {src.act || "N/A"} - {src.section || "N/A"}
                  </div>
                  {src.snippet && (
                    <p>
                      {src.snippet}
                      {src.snippet.length === 200 ? "..." : ""}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
