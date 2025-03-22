
import React from 'react';
import './ContentFrame.css';

const ContentFrame = () => {
  return (
    <div className="content-frame">
      <div className="button-group">
        <button className="main-cta">GET STARTED</button>
        <button className="secondary-cta">SIGN UP FOR FREE</button>
      </div>
      <div className="divider-line"></div>
      <div className="features">
        <h2>Our AI-driven analytics provides the insights you need!</h2>
        <ul>
          <li>In-depth engagement metrics</li>
          <li>Performance tracking</li>
          <li>Tailored recommendations</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentFrame;