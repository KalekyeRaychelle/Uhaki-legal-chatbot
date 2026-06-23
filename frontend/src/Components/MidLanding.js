import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Outline from '../Assets/Outline.png';
import '../Styles/midSectionLanding.css';
import { useLanguage } from '../Context/LanguageContext';
import RevealOnScroll from './RevealOnScroll';

const STRINGS = {
  en: {
    badge: 'Built for Kenya',
    h1Start: 'Know your',
    h1Word: 'rights',
    h1End: ', simply.',
    p: 'Ask questions about Kenyan law in plain language. Uhaki pulls answers directly from 20 acts and the Constitution; with sources.',
    cta: 'Start a conversation',
    actsLink: 'See what I can answer',
    chips: ['Constitutional rights', 'Family law', 'Tenant rights', 'Employment disputes', 'Tax disputes', 'Evidence law'],
    subtitle: 'Legal assistant · Kenya',
    welcome: 'Hello! Ask me anything about your rights under Kenyan law.',
    placeholder: 'Type your question...',
    conversation: [
      { role: 'user', text: 'Can my landlord evict me without notice?' },
      { role: 'bot', text: 'No. Written notice is required — at least one month for monthly tenancies.', sources: ['Landlord & Tenant Act · §4'] },
      { role: 'user', text: 'Can my employer withhold my salary?' },
      { role: 'bot', text: 'Generally no. Withholding wages without lawful cause is prohibited under Kenyan employment law.', sources: ['Employment Act · §19'] },
    ],
  },
  sw: {
    badge: 'Imeundwa kwa minajili ya Kenya',
    h1Start: 'Jua',
    h1Word: 'haki',
    h1End: ' zako, kwa urahisi.',
    p: 'Uliza maswali kuhusu sheria ya Kenya kwa lugha ya kawaida. Uhaki hutoa majibu moja kwa moja kutoka kwa sheria 20 na Katiba; na vyanzo.',
    cta: 'Anza mazungumzo',
    actsLink: 'Tazama ninachoweza kujibu',
    chips: ['Haki za Kikatiba', 'Sheria ya familia', 'Haki za mpangaji', 'Migogoro ya kazi', 'Migogoro ya kodi', 'Sheria ya ushahidi'],
    subtitle: 'Msaidizi wa kisheria · Kenya',
    welcome: 'Habari! Niulize chochote kuhusu haki zako chini ya sheria ya Kenya.',
    placeholder: 'Andika swali lako...',
    conversation: [
      { role: 'user', text: 'Mwenye nyumba anaweza kunifukuza bila notisi?' },
      { role: 'bot', text: 'Hapana. Notisi ya maandishi inahitajika — angalau mwezi mmoja kwa upangaji wa kila mwezi.', sources: ['Landlord & Tenant Act · §4'] },
      { role: 'user', text: 'Mwajiri wangu anaweza kuzuia mshahara wangu?' },
      { role: 'bot', text: 'Kwa kawaida hapana. Kuzuia mshahara bila sababu ya kisheria ni marufuku chini ya sheria ya ajira ya Kenya.', sources: ['Employment Act · §19'] },
    ],
  },
};

const MidLanding = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  const handleChatClick = () => navigate('/ChatPage');
  const onActsCoveredClick = () => navigate('/ActsCovered');
  const animatedLetters = t.h1Word.split('');

  useEffect(() => {
    const conversation = t.conversation;
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
      el.textContent = t.placeholder;
    }

    // Reset chat to welcome message on lang switch
    const msgs = document.getElementById('chatMsgs');
    if (msgs) {
      msgs.innerHTML = `<div class="cmsg bot"><div class="cbubble">${t.welcome}</div></div>`;
    }

    function runStep() {
      if (step >= conversation.length) {
        schedule(() => {
          const msgs = document.getElementById('chatMsgs');
          if (!msgs) return;
          msgs.innerHTML = `<div class="cmsg bot"><div class="cbubble">${t.welcome}</div></div>`;
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

    return () => { timers.forEach(t => { clearTimeout(t); clearInterval(t); }); };
  }, [lang,t]); // re-runs when language switches

  return (
    <section className='midSection'>
      <RevealOnScroll className="midLeft">
        <span className="floating-badge">{t.badge}</span>
        <h1>
          {t.h1Start}{' '}
          <em className="animated-word" aria-label={t.h1Word}>
            {animatedLetters.map((letter, index) => (
              <span
                key={`${t.h1Word}-${index}`}
                aria-hidden="true"
                style={{ '--letter-delay': `${index * 90}ms` }}
              >
                {letter}
              </span>
            ))}
          </em>
          {t.h1End}
        </h1>
        <p>{t.p}</p>
        <div className='convoSide'>
          <button onClick={handleChatClick}>{t.cta}</button>
          <button onClick={onActsCoveredClick} className="text-link">{t.actsLink}</button>
        </div>
        <div className="floatBoats">
          {t.chips.map((chip, i) => <span key={i}>{chip}</span>)}
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="midRight" delay={120}>
        <div className="outline">
          <img src={Outline} alt="country map" />
        </div>
        <div className="chat-float">
          <div className="chat-float-header">
            <div className="float-avatar">
              <i className="ti ti-scale" style={{ fontSize: '13px' }} aria-hidden="true"></i>
            </div>
            <div>
              <div className="hname">Uhaki</div>
              <small>{t.subtitle}</small>
            </div>
          </div>
          <div className="chat-msgs" id="chatMsgs">
            <div className="cmsg bot">
              <div className="cbubble">{t.welcome}</div>
            </div>
          </div>
          <div className="chat-float-input">
            <span id="inputPreview">{t.placeholder}</span>
            <div className="send-mini">
              <i className="ti ti-arrow-up" style={{ fontSize: '12px' }} aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default MidLanding;
