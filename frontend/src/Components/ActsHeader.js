import React from 'react'
import { IconScale } from '@tabler/icons-react';
import '../Styles/LandingHeader.css';
import { useNavigate } from 'react-router-dom';
const ActsHeader = () => {
       const navigate = useNavigate();
      const handleChatClick = () => {

        navigate('/ChatPage');
      }
  return (
    <div className="landingHeader">
        <div className='rightSide'>
            <div className="logo-box"><IconScale/></div>
            <span>Uhaki</span>
        </div>
        <div className='leftSide'>
             <a href="/">Home</a>
            <button onClick={handleChatClick} className='chat-btn'>Start Chatting</button>
             <div className='language'>
                <button className='lang-btn1'>EN</button>
                <button className='lang-btn'>SW</button>
            </div>
        </div>
      
    </div>
  )
}

export default ActsHeader
