import React, { useState, useEffect } from 'react';
import '../styles/carousel.scss';
import img1 from "../assets/images/puerta-roma.png"
import img2 from "../assets/images/puerta-venus-lisa-negra.png"
import img3 from "../assets/images/puerta-venus-con-ventana-al-medio.png"

const images = [
  {
    src: img1,
    alt: 'Puerta roma',
    caption: 'Puerta roma',
    description: 'Puerta de frente doble chapa inyectada de 18mm simil madera, con barral cuadrado y cerradura europea.'
  },
  {
    src: img2,
    alt: 'Puerta venus',
    caption: 'Puerta venus',
    description: 'QWRQW'
  },
  {
    src: img3,
    alt: 'Puerta roma combinada',
    caption: 'Puerta roma combinada',
    description: 'Elegante y moderna...'
  }
];

const Carousel = () => {
  const [indexActual, setIndexActual] = useState(0);

  const slideAnterior = () => {
    setIndexActual((indexPrevio) => indexPrevio === 0 ? images.length - 1 : indexPrevio - 1);
  };

  const slideSiguiente = () => {
    setIndexActual((indexPrevio) => (indexPrevio + 1) % images.length);
  };



  useEffect(() => {
    const intervalo = setInterval(slideSiguiente, 5000);

    return () => clearInterval(intervalo)
  }, [])

  return (
    <section className='carousel__container' id='carousel'>
      <div className="carousel">
        {images.map((image, index) => (
          <div key={index} className={`carousel__item
          ${index === indexActual ? 'active' : ''}`}
          >
            <div className="carousel__img--container">
              <img src={image.src} alt={image.alt} />
            </div>
            <div className="caption">
              <h3 className='noto-sans-bold'>{image.caption}</h3>
            </div>
          </div>
        ))}
        <button className="carousel__control--anterior" onClick={slideAnterior}>{`<`}</button>
        <button className="carousel__control--siguiente" onClick={slideSiguiente}>{`>`}</button>

        <div className="carousel__indicadores">
          {images.map((_, index) => (
            <span
              key={index}
              className={`indicador ${index === indexActual ? 'active' : ''}`}
              onClick={() => setIndexActual(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
