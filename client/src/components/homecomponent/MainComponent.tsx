
import React from 'react';
import HeaderFrame from './HeaderFrame';
import ContentFrame from './ContentFrame';
import ActionFrame from './ActionFrame';
import './MainComponent.css';
import TestimonialFrame from './TestimonialFrame';
import ContactFrame from './ContactFrame';

const MainComponent = () => {
  return (
    <div className="main-container">
      <HeaderFrame />
      <ContentFrame />
      <TestimonialFrame/>
      <ContactFrame/>
      <ActionFrame />
    </div>
  );
};

export default MainComponent;