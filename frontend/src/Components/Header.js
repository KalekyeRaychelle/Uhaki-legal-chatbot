import React, { useState } from 'react';
import '../Styles/Header.css';
import {
  IconScale,
  IconRefresh,
  IconMenu2,
  IconX
} from '@tabler/icons-react';
import { useLanguage } from '../Context/LanguageContext';
import { Link } from 'react-router-dom';

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

  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link to='/'>{t.home}</Link>

        <Link to='/ActsCovered'>{t.acts}</Link>

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

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            {t.home}
          </Link>

          <Link to="/ActsCovered" onClick={() => setMenuOpen(false)}>
            {t.acts}
          </Link>
                

        <div className="mobile-language">
              <button
                className={lang === 'en' ? 'lang-active' : ''}
                onClick={() => setLang('en')}
              >
                EN
              </button>

              <button
                className={lang === 'sw' ? 'lang-active' : ''}
                onClick={() => setLang('sw')}
              >
                SW
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Header;