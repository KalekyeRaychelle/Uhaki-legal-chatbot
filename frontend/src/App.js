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
  const chatRef = useRef();

  const handleClearChat = () => {
    if (chatRef.current) {
      chatRef.current();
    }
  };

  return (
    <LanguageProvider>
      <div className="App">
        <main className="route-shell" key={path}>
          <Routes location={location}>
            <Route path="/" element={<LandinPage />} />
            <Route
              path="/ChatPage"
              element={
                <>
                  <Header onClearChat={handleClearChat} />
                  <ChatPage registerClear={chatRef} />
                </>
              }
            />
            <Route path="/ActsCovered" element={<ActsCovered />} />
          </Routes>
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
