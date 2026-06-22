import React from 'react';
import '../Styles/Header.css';
import { IconScale } from '@tabler/icons-react';
import { IconRefresh } from '@tabler/icons-react';
import { useLanguage } from '../Context/LanguageContext';
const Header = ({ onClearChat }) => {
  
  const {lang, setLang}=useLanguage();
  return (  
      <div className='header'>
        <div className="chatLeft">
          <div className="logo-box">
            <IconScale />
          </div>

        <div className="titleGroup">
          <span>Uhaki</span>
          <p>Legal assistant · Kenya</p>
        </div>
      </div>
      <div className='chatRight'>
        <a href="/">Home</a>
        <a href='/ActsCovered'>Acts Covered</a>
        <button onClick={onClearChat} className='clear-btn'><IconRefresh size={16}/> Clear Chat</button>

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