import React, { useRef } from 'react';
import '../styles/main.scss';
import Landing from './Landing';
import Products from './Products';
import { slides } from "../mocks/carouselData.json";
import { Carousel } from './Carousel';

const Main = () => {
  const carouselRef = useRef(null);

  const scrollToCarousel = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Landing onButtonClick={scrollToCarousel} />
      <div ref={carouselRef}>
        <Carousel data={slides} />
      </div>
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
