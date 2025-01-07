import React from 'react';
import '../styles/main.scss'
import Landing from './Landing';
import Products from './Products';
import { slides } from "../mocks/carouselData.json"
import { Carousel } from './Carousel';
const Main = () => {
  return (
    <>
      <Landing />
      <Carousel data={slides} />
      <Products category="ventanas" />
      <Products category="puertas" />
      <Products category="ventanas-balcon" />
      <Products category="portones" />
      <Products category="puertas-placas" />
      <Products category="rajas-de-abrir" />
    </>
  );
};

export default Main;
