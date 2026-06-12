import React from 'react'
import { IconScale } from '@tabler/icons-react';
import '../Styles/LandingHeader.css';
const LandingHeader = () => {
  return (
    <div className="landingHeader">
        <div className='rightSide'>
            <div className="logo-box"><IconScale/></div>
            <span>Uhaki</span>
        </div>
        <div className='leftSide'>
            <span>Acts covered</span>
            <button>Start Chatting</button>
        </div>
      
    </div>
  )
}

export default LandingHeader
