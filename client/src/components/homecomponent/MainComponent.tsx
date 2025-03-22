// MainComponent.js
import React from 'react';
import HeaderFrame from './HeaderFrame';
import ContentFrame from './ContentFrame';
import ActionFrame from './ActionFrame';
import './MainComponent.css';

const MainComponent = () => {
  return (
    <div className="main-container">
      <HeaderFrame />
      <ContentFrame />
      <ActionFrame />
    </div>
  );
};

export default MainComponent;