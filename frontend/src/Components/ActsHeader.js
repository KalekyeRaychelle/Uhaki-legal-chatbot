import React from 'react';
import { IconScale } from '@tabler/icons-react';
import '../Styles/LandingHeader.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../Context/LanguageContext';

const STRINGS = {
  en: {
    home: 'Home',
    chat: 'Start Chatting',
  },
  sw: {
    home: 'Nyumbani',
    chat: 'Anza Mazungumzo',
  },
};

const ActsHeader = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const t = STRINGS[lang];

  const handleChatClick = () => {
    navigate('/ChatPage');
  };

  return (
    <div className="landingHeader">
      <div className="rightSide">
        <div className="logo-box">
          <IconScale />
        </div>
        <span>Uhaki</span>
      </div>

      <div className="leftSide">
        <a href="/">{t.home}</a>

        <button onClick={handleChatClick} className="chat-btn">
          {t.chat}
        </button>

        <div className="language">
          <button
            className={`lang-btn1 ${lang === 'en' ? 'lang-active' : ''}`}
            onClick={() => setLang('en')}
          >
            EN
          </button>

          <button
            className={`lang-btn ${lang === 'sw' ? 'lang-active' : ''}`}
            onClick={() => setLang('sw')}
          >
            SW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActsHeader;