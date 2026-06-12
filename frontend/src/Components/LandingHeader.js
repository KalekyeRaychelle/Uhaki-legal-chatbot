import React from 'react'
import { IconScale } from '@tabler/icons-react';
import '../Styles/LandingHeader.css';
import { useNavigate } from 'react-router-dom';
const LandingHeader = () => {
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
            <span>Acts covered</span>
            <button onClick={handleChatClick}>Start Chatting</button>
        </div>
      
    </div>
  )
}

export default LandingHeader
