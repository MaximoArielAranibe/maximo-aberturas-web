import React from 'react';
import Carousel from './Carousel';
import Items from './Items';
import '../styles/main.scss'
import Landing from './Landing';

const Main = () => {

  return (
    <div className='main__container'>
      <Landing />
      <Carousel />
      <Items />

    </div>
  );
};

export default Main;
