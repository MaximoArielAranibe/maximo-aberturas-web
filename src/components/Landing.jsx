import '../styles/landing.scss';
import React from 'react';
import Card from './Card.jsx';
import Button from './Button.jsx';
import { Title } from './Title.jsx';

const Landing = ({ onButtonClick }) => {
  return (
    <header className="landing" id='landing-section'>
      <Title
        titleStyle="landing__title"
        title="Las mejores aberturas de aluminio para tu hogar"
      />
      <div className="landing__wrapper">
        <Card />
        <Button className="landing__button" action={onButtonClick} />
      </div>
    </header>
  );
};

export default Landing;
