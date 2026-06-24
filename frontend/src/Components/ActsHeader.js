import React from 'react';
import { IconScale } from '@tabler/icons-react';
import '../Styles/ActsHeader.css';
import { useLanguage } from '../Context/LanguageContext';
import { Link } from 'react-router-dom';

const STRINGS = {
  en: {
    home: 'Home',
    chat: 'Chat',
  },
  sw: {
    home: 'Nyumbani',
    chat: 'Uliza',
  },
};

const ActsHeader = () => {
  const { lang, setLang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <div className="acts-header">
      <div className="acts-brand">
        <div className="acts-logo">
          <IconScale />
        </div>
        <span className="acts-title">Uhaki</span>
      </div>

      <div className="acts-nav">
        <Link to="/" className="acts-link">
          {t.home}
        </Link>

        <Link to="/ChatPage" className="acts-link">
          {t.chat}
        </Link>

        <div className="acts-language">
          <button
            className={`acts-lang-left ${
              lang === 'en' ? 'lang-active' : ''
            }`}
            onClick={() => setLang('en')}
          >
            EN
          </button>

          <button
            className={`acts-lang-right ${
              lang === 'sw' ? 'lang-active' : ''
            }`}
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