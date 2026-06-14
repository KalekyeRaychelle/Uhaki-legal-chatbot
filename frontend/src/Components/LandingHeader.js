import React from 'react'
import { IconScale } from '@tabler/icons-react';
import '../Styles/LandingHeader.css';
import { useNavigate } from 'react-router-dom';
const LandingHeader = ({ onActsCoveredClick }) => {
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
            <button type="button" className="nav-link" onClick={onActsCoveredClick}>Acts covered</button>
            <button onClick={handleChatClick}>Start Chatting</button>
        </div>
      
    </div>
  )
}

export default LandingHeader
