import React, { useEffect, useRef, useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import "../Styles/MessageInput.css";
import { useLanguage } from '../Context/LanguageContext';

const STRINGS = {
  en: {
    placeholder: "Ask about your rights..."
  },
  sw: {
    placeholder: "Uliza kuhusu haki zako..."
  }
};
const MessageInput = ({ onSend }) => {
  const { lang, setLang } = useLanguage();
  const t = STRINGS[lang];
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 150;
      textareaRef.current.style.height =
        scrollHeight > maxHeight ? `${maxHeight}px` : `${scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="composer">
      <textarea
        ref={textareaRef}
        className="composer-input"
        placeholder={t.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <button className="send-btn" type="button" onClick={handleSend} aria-label="Send message">
        <IconArrowUp size={24} stroke={2.4} />
      </button>
    </div>
  );
};

export default MessageInput;
