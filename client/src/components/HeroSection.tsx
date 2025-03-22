// HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Transform Your Digital Presence</h1>
        <p className="subtitle">Next-generation solutions for modern businesses</p>
        <div className="hero-cta">
          <button className="cta-button primary">Start Free Trial</button>
          <button className="cta-button secondary">Watch Demo</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;