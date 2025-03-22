// ContactFrame.js
import React from 'react';
import './ContactFrame.css';

const ContactFrame = () => {
  return (
    <div className="contact-frame">
      <h2>Ready to Boost Your Social Media Performance?</h2>
      
      <div className="options-list">
        <div className="option-item">
          <input type="checkbox" id="option1" />
          <label htmlFor="option1">All: no, ready, not sure, ever, could result</label>
        </div>
        <div className="option-item">
          <input type="checkbox" id="option2" />
          <label htmlFor="option2">Missing: do not, must, could...</label>
        </div>
      </div>

      <div className="contact-form">
        <table>
          <tbody>
            <tr>
              <td>
                <input type="text" placeholder="Name" />
              </td>
              <td>
                <input type="email" placeholder="Email" />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="text" placeholder="Social Media Media" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <button className="submit-btn">Get Started</button>
    </div>
  );
};

export default ContactFrame;