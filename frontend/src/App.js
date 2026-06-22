import React, { useRef } from 'react';
import Header from './Components/Header';
import './App.css';
import ChatPage from './Pages/ChatPage';
import LandinPage from './Pages/LandinPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import ActsCovered from './Pages/ActsCovered';
import { LanguageProvider } from './Context/LanguageContext';

function App() {
  const location = useLocation();
  const path = location.pathname;
  const showHeader = path === '/ChatPage';

  const chatRef = useRef();

  const handleClearChat = () => {
    if (chatRef.current) {
      chatRef.current();
    }
  };

  return (
    <LanguageProvider>
      <div className="App">
        {showHeader && <Header onClearChat={handleClearChat} />}
        <Routes>
          <Route path="/" element={<LandinPage />} />
          <Route path="/ChatPage" element={<ChatPage registerClear={chatRef} />} />
          <Route path="/ActsCovered" element={<ActsCovered />} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;