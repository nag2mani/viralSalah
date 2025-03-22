// TestimonialFrame.js
import React from 'react';
import './TestimonialFrame.css';

const TestimonialFrame = () => {
  return (
    <div className="testimonial-frame">
      <h2>What Our Users Say</h2>
      <div className="testimonial-grid">
        <div className="testimonial-column">
          <h3>User 1</h3>
          <div className="user-info">
            <span>AshRan</span>
            <p>"ViralSalah transformed our social media strategy. You imagine that we shouldn't."</p>
          </div>
        </div>
        
        <div className="testimonial-column">
          <h3>User 2</h3>
          <div className="user-info">
            <span>AshRan</span>
            <p>"We can't help you,"</p>
          </div>
        </div>
        
        <div className="testimonial-column">
          <h3>User 3</h3>
          <div className="user-info">
            <span>AshLan</span>
            <p>"I feel like this is a successful my audience with confidence."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialFrame;