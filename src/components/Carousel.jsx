import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "../styles/carousel.scss";
import { Link } from "react-router-dom";

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  // Función para avanzar a la siguiente diapositiva
  const nextSlide = () => {
    setSlide((prevSlide) => (prevSlide === data.length - 1 ? 0 : prevSlide + 1));
  };

  // Función para retroceder a la diapositiva anterior
  const prevSlide = () => {
    setSlide((prevSlide) => (prevSlide === 0 ? data.length - 1 : prevSlide - 1));
  };

  // Configuración del intervalo automático
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [slide]);

  return (
    <div className="carousel">
      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            className={
              slide === idx
                ? "slide-container slide-active"
                : "slide-container slide-hidden"
            }
          >
            {slide === idx && <span className="slide-title oswald">{item.title}</span>}
            <img
              src={item.src}
              alt={item.alt}
              className="slide"
            />
            {slide === idx && (
              <button className="slide-button">
                <Link to={item.url} className="slide-link">Ver más</Link>
              </button>
            )}
          </div>
        );
      })}
      <div className="arrow__container">
        <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
        <BsArrowRightCircleFill onClick={nextSlide} className="arrow arrow-right" />
      </div>
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className={slide === idx ? "indicator" : "indicator indicator-inactive"}
            ></button>
          );
        })}
      </span>
    </div>
  );
};
