import React, { forwardRef } from 'react';
import '../Styles/LandingBottom.css';
import { useLanguage } from '../Context/LanguageContext';
import RevealOnScroll from './RevealOnScroll';

const STRINGS = {
  en: {
    kenyanActs: 'Kenyan acts indexed',
    constitution: 'Constitution covered',
    free: 'Free',
    accessible: 'Always accessible',

    howItWorks: 'How it works',

    step1Title: 'Ask in plain language',
    step1Text: "No legal jargon needed. Ask the way you'd ask a friend.",

    step2Title: 'Uhaki searches the law',
    step2Text: 'It finds the most relevant passages across all indexed acts.',

    step3Title: 'Get a sourced answer',
    step3Text: 'Every answer shows exactly which act and section it came from.',

    footer1: '© 2025 Uhaki Legal Assistant System',
    footer2: 'General legal information only — not legal advice',
  },

  sw: {
    kenyanActs: 'Sheria za Kenya zilizoorodheshwa',
    constitution: 'Katiba iliyojumuishwa',
    free: 'Bure',
    accessible: 'Inapatikana kila wakati',

    howItWorks: 'Jinsi inavyofanya kazi',

    step1Title: 'Uliza kwa lugha rahisi',
    step1Text: 'Hakuna haja ya kutumia lugha ngumu ya kisheria. Uliza kama unavyouliza rafiki.',

    step2Title: 'Uhaki hutafuta sheria',
    step2Text: 'Hupata vifungu vinavyohusika zaidi kutoka kwa sheria zote zilizoorodheshwa.',

    step3Title: 'Pata jibu lenye marejeleo',
    step3Text: 'Kila jibu linaonyesha sheria na kifungu kilikotumika.',

    footer1: '© 2025 Mfumo wa Msaidizi wa Kisheria wa Uhaki',
    footer2: 'Taarifa za jumla za kisheria pekee — si ushauri wa kisheria',
  }
};

const LandingBottom = forwardRef((props, ref) => {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <div className='landing-bottom' ref={ref}>
      <RevealOnScroll className="stats-bar">
        <div className="stat">
          <div className="stat-num">20+</div>
          <div className="stat-label">{t.kenyanActs}</div>
        </div>

        <div className="stat">
          <div className="stat-num">1</div>
          <div className="stat-label">{t.constitution}</div>
        </div>

        <div className="stat">
          <div className="stat-num">{t.free}</div>
          <div className="stat-label">{t.accessible}</div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="how-section">
        <h2>{t.howItWorks}</h2>

        <div className="steps">
          <RevealOnScroll className="step" delay={80}>
            <div className="step-num">1</div>
            <h3>{t.step1Title}</h3>
            <p>{t.step1Text}</p>
          </RevealOnScroll>

          <RevealOnScroll className="step" delay={160}>
            <div className="step-num">2</div>
            <h3>{t.step2Title}</h3>
            <p>{t.step2Text}</p>
          </RevealOnScroll>

          <RevealOnScroll className="step" delay={240}>
            <div className="step-num">3</div>
            <h3>{t.step3Title}</h3>
            <p>{t.step3Text}</p>
          </RevealOnScroll>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="footer">
        <span>{t.footer1}</span>
        <span>{t.footer2}</span>
      </RevealOnScroll>
    </div>
  );
});

export default LandingBottom;
