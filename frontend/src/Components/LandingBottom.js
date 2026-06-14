import React, { forwardRef } from 'react'
import '../Styles/LandingBottom.css'
const LandingBottom = forwardRef((props, ref) => {
  return (
    <div className='landing-bottom' ref={ref}>
          <div className="stats-bar">
            <div className="stat"><div className="stat-num">20+</div><div className="stat-label">Kenyan acts indexed</div></div>
            <div className="stat"><div className="stat-num">1</div><div className="stat-label">Constitution covered</div></div>
            <div className="stat"><div className="stat-num">Free</div><div className="stat-label">Always accessible</div></div>
        </div>

        <div className="how-section">
            <h2>How it works</h2>
            <div className="steps">
            <div className="step"><div className="step-num">1</div><h3>Ask in plain language</h3><p>No legal jargon needed. Ask the way you'd ask a friend.</p></div>
            <div className="step"><div className="step-num">2</div><h3>Uhaki searches the law</h3><p>It finds the most relevant passages across all indexed acts.</p></div>
            <div className="step"><div className="step-num">3</div><h3>Get a sourced answer</h3><p>Every answer shows exactly which act and section it came from.</p></div>
            </div>
        </div>

        <div className="footer">
            <span>© 2025 Uhaki Legal Assistant System</span>
            <span>General legal information only — not legal advice</span>
        </div>
        </div>

  )
})

export default LandingBottom
