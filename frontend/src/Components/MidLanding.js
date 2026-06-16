import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Outline from '../Assets/Outline.png';
import '../Styles/midSectionLanding.css';
const MidLanding = () => {
	
	const navigate = useNavigate();
  const handleChatClick = () => {
    navigate('/ChatPage');
  };
  const onActsCoveredClick=()=>{
        navigate('/ActsCovered')
  };

  useEffect(() => {
  const conversation = [
      { role: 'user', text: 'Can my landlord evict me without notice?' },
      { role: 'bot', text: 'No. Written notice is required — at least one month for monthly tenancies.', sources: ['Landlord & Tenant Act · §4'] },
      { role: 'user', text: 'Can my employer withhold my salary?' },
      { role: 'bot', text: 'Generally no. Withholding wages without lawful cause is prohibited under Kenyan employment law.', sources: ['Employment Act · §19'] },
    ];

    let step = 0;
    const timers = [];

    function schedule(callback, delay) {
      const timer = setTimeout(callback, delay);
      timers.push(timer);
      return timer;
    }

    function addUserMsg(text) {
      const msgs = document.getElementById('chatMsgs');
      if (!msgs) return;
      const div = document.createElement('div');
      div.className = 'cmsg user';
      div.innerHTML = `<div class="cbubble">${text}</div>`;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function addTyping() {
      const msgs = document.getElementById('chatMsgs');
      if (!msgs) return;
      const div = document.createElement('div');
      div.className = 'cmsg bot'; div.id = 'typing';
      div.innerHTML = `<div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function removeTyping() { const el = document.getElementById('typing'); if (el) el.remove(); }

    function addBotMsg(text, sources) {
      const msgs = document.getElementById('chatMsgs');
      if (!msgs) return;
      const div = document.createElement('div');
      div.className = 'cmsg bot';
      const pills = sources.map(s => `<span class="spill"><i class="ti ti-file-text" style="font-size:10px"></i>${s}</span>`).join('');
      div.innerHTML = `<div class="cbubble">${text}</div><div class="source-row">${pills}</div>`;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function typeInput(text, cb) {
      const el = document.getElementById('inputPreview');
      if (!el) return;
      el.style.color = '#3C3489';
      let i = 0; el.textContent = '';
      const iv = setInterval(() => {
        el.textContent += text[i]; i++;
        if (i >= text.length) { clearInterval(iv); schedule(cb, 400); }
      }, 50);
      timers.push(iv);
    }

    function clearInput() {
      const el = document.getElementById('inputPreview');
      if (!el) return;
      el.style.color = '#B4B2A9';
      el.textContent = 'Type your question...';
    }

    function runStep() {
      if (step >= conversation.length) {
        schedule(() => {
          const msgs = document.getElementById('chatMsgs');
          if (!msgs) return;
          msgs.innerHTML = `<div class="cmsg bot"><div class="cbubble">Hello! Ask me anything about your rights under Kenyan law.</div></div>`;
          step = 0;
          schedule(runStep, 2000);
        }, 3000);
        return;
      }
      const msg = conversation[step];
      if (msg.role === 'user') {
        typeInput(msg.text, () => { addUserMsg(msg.text); clearInput(); step++; schedule(runStep, 500); });
      } else {
        addTyping();
        schedule(() => { removeTyping(); addBotMsg(msg.text, msg.sources); step++; schedule(runStep, 2000); }, 1200);
      }
    }

    schedule(runStep, 1500);

    return () => {
      timers.forEach((timer) => {
        clearTimeout(timer);
        clearInterval(timer);
      });
    };
  }, []);

  return (
   <section className='midSection'>
        <div className="midLeft">
            <span>Built for Kenya</span>
            <h1>Know your <em>rights</em>, simply.</h1>
            <p>Ask questions about Kenyan law in plain language. Uhaki pulls answers directly from 20 acts and the Constitution; with sources.</p>
            <div className='convoSide'>
              <button onClick={handleChatClick}> Start a conversation</button>
              <button onClick={onActsCoveredClick} className="text-link">See what I can answer</button>
            </div>
            <div className="floatBoats">
              <span>Constitutional rights</span>
              <span>Family law</span>
              <span>Tenant rights</span>
              <span> Employment disputes</span>
              <span>Tax disputes </span>
              <span>Evidence law</span>
            </div>
        </div>
        <div className="midRight">
            <div className="outline">
              <img src={Outline} alt="country map" />
            </div>
            <div className="chat-float">
              <div className="chat-float-header">
                <div className="float-avatar"><i className="ti ti-scale" style={{ fontSize: '13px' }} aria-hidden="true"></i></div>
                <div>
                  <div className="hname">Uhaki</div>
                  <small>Legal assistant · Kenya</small>
                </div>
              </div>
              <div className="chat-msgs" id="chatMsgs">
                <div className="cmsg bot">
                  <div className="cbubble">Hello! Ask me anything about your rights under Kenyan law.</div>
                </div>
              </div>
              <div className="chat-float-input">
                <span id="inputPreview">Type your question...</span>
                <div className="send-mini"><i className="ti ti-arrow-up" style={{ fontSize: '12px' }} aria-hidden="true"></i></div>
              </div>
            </div>
          </div>
   </section>
	)
}

export default MidLanding
