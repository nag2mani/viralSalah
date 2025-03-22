// FeaturesSection.js
import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <section className="features">
      <div className="features-container">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Instant Deployment</h3>
            <p>Launch your campaigns in minutes with one-click setup</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>Real-time performance tracking and insights</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Platform</h3>
            <p>Enterprise-grade security for your data</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;