import React from 'react';
import Carousel from './Carousel';
import Items from './Items';
import '../styles/main.scss'

const Main = () => {

  return (
    <div className='main__container'>
      <section><Carousel /></section>
        <Items />
    </div>
  );
};

export default Main;
