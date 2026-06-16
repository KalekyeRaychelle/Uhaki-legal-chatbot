import React, { useRef } from "react";
import "../Styles/LandinPage.css";
import LandingHeader from "../Components/LandingHeader";
import MidLanding from "../Components/MidLanding";
import LandingBottom from "../Components/LandingBottom";
const LandinPage = () => {
  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="page">
      <LandingHeader onActsCoveredClick={scrollToBottom}/>
      <MidLanding />
      <LandingBottom ref={bottomRef}/>
     </div>
    
   
  );
};

export default LandinPage;
