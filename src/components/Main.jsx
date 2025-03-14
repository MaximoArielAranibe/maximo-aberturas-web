import React, { useRef } from 'react';
import '../styles/main.scss';
import Landing from './Landing';
import Products from './Products';
import { slides } from "../mocks/carouselData.json";
import { Carousel } from './Carousel';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollToCarousel = () => {
    navigate('/', { state: { ignoreScroll: true } }); // Ignorar el scroll al top
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
      <Products category="puertas-placas" />
      <Products category="ventanas-balcon" />
      <Products category="portones" />
      <Products category="rajas-de-abrir" />
      <Products category="rejas" />
      <Products category="aislantes" />
    </>
  );
};

export default Main;
