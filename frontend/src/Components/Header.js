import React from 'react';
import '../Styles/Header.css';
import { IconScale } from '@tabler/icons-react';
import { IconRefresh } from '@tabler/icons-react';

const Header = ({ onClearChat }) => {
  
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
        <a href='/acts'>Acts Covered</a>
        <button onClick={onClearChat}><IconRefresh size={16}/> Clear Chat</button>
      </div>
    </div>
  );
};

export default Header;