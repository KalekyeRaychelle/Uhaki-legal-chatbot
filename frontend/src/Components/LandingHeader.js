import React, { useState} from 'react'
import { IconMenu2, IconScale, IconX, IconMoon,IconSun } from '@tabler/icons-react';
import '../Styles/LandingHeader.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../Context/LanguageContext';
const STRINGS = {
  en: {
    acts: 'Acts Covered',
    questions: 'Start Chatting',
  },
  sw: {
    acts: 'Sheria Zilizotumiwa',
    questions: 'Uliza Maswali',
  }
};

const LandingHeader = () => {
      
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const { lang, setLang, darkMode, toggleTheme } = useLanguage();
      const t = STRINGS[lang];

      
  return (
    <div className="landingHeader">
        <div className='rightSide'>
            <div className="logo-box"><IconScale/></div>
            <span>Uhaki</span>
        </div>
        <div className='leftSide'>
            <button
              type="button"
              className="menu-toggle"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <IconMenu2 size={22} />
            </button>
            <div className={`landing-actions ${isMenuOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="menu-close"
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <IconX size={20} />
              </button>
              <Link to="/ActsCovered" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.acts}</Link>
              <Link to="/ChatPage" className="nav-link" onClick={() => setIsMenuOpen(false)}>{t.questions}</Link>
            </div>
             <button className="theme-mobile" onClick={toggleTheme}>
              {darkMode ? <IconSun /> : <IconMoon />}
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
              onClick={() => {
                console.log("SW clicked");
                setLang('sw');
              }}
            >
              SW
            </button>
          </div>
  
          </div>
        </div>
  )
}

export default LandingHeader
