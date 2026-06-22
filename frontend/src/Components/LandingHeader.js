import React from 'react'
import { IconScale } from '@tabler/icons-react';
import '../Styles/LandingHeader.css';
import { useNavigate } from 'react-router-dom';
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
      const navigate = useNavigate();
      const { lang, setLang } = useLanguage();
      console.log("Current language:", lang);
      const t = STRINGS[lang];
      const handleChatClick = () => {

        navigate('/ChatPage');
      }
      const onActsCoveredClick=()=>{
        navigate('/ActsCovered')
      }
  return (
    <div className="landingHeader">
        <div className='rightSide'>
            <div className="logo-box"><IconScale/></div>
            <span>Uhaki</span>
        </div>
        <div className='leftSide'>
            <button type="button" className="nav-link" onClick={onActsCoveredClick}>{t.acts}</button>
            <button onClick={handleChatClick} className='chat-btn'>{t.questions}</button>
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
