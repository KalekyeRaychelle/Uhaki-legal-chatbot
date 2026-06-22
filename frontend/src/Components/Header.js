import React from 'react';
import '../Styles/Header.css';
import { IconScale, IconRefresh } from '@tabler/icons-react';
import { useLanguage } from '../Context/LanguageContext';

const STRINGS = {
  en: {
    subtitle: 'Legal assistant · Kenya',
    home: 'Home',
    acts: 'Acts Covered',
    clear: 'Clear Chat',
  },
  sw: {
    subtitle: 'Msaidizi wa kisheria · Kenya',
    home: 'Nyumbani',
    acts: 'Sheria Zilizotumiwa',
    clear: 'Futa Mazungumzo',
  }
};

const Header = ({ onClearChat }) => {
  const { lang, setLang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <div className='header'>
      <div className="chatLeft">
        <div className="logo-box">
          <IconScale />
        </div>
        <div className="titleGroup">
          <span>Uhaki</span>
          <p>{t.subtitle}</p>
        </div>
      </div>

      <div className='chatRight'>
        <a href="/">{t.home}</a>
        <a href='/ActsCovered'>{t.acts}</a>
        <button onClick={onClearChat} className='clear-btn'>
          <IconRefresh size={16} /> {t.clear}
        </button>

        <div className='language'>
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

export default Header;