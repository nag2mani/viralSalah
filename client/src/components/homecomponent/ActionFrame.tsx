// ActionFrame.js
import React from 'react';
import './ActionFrame.css';

const ActionFrame = () => {
  return (
    <div className="action-frame">
      <div className="stats-container">
        <div className="stat-item">
          <h3>95%</h3>
          <p>Engagement Boost</p>
        </div>
        <div className="stat-item">
          <h3>10M+</h3>
          <p>Analytics Processed</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>Support Available</p>
        </div>
      </div>
    </div>
  );
};

export default ActionFrame;