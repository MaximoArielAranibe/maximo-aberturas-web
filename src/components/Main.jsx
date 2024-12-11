import React from 'react';
import Carousel from './Carousel';
import '../styles/main.scss'
import Landing from './Landing';
import Products from './Products';

const Main = () => {
  const items = ["Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5"];
  return (
    <>
      <Landing />
      <Carousel items={items}/>
      <Products category="puertas"/>
      <Products category="ventanas"/>
    </>
  );
};

export default Main;
