import React, { useRef, useState } from 'react';
import '../styles/card.scss';
import productThumbnail from '../assets/images/puerta-roma.png';
import useProducts from '../hooks/useProducts';

const Card = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const products = useProducts();


  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 3; // Ajusta la velocidad de desplazamiento
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className='card__container'
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
    >
      {products.map(({ id, title, price, thumbnail }) => {
        return (
          <div className="card" key={id}>
            <picture className="card__thumbnail">
              <img className="card__thumbnail-img" src={productThumbnail} alt="puerta-nova-simil-madera" />
              <div className="card__thumbnail-shadow"></div>
            </picture>
            <h3 className="card__offer">OFERTA</h3>
            <div className="card__details">
              <h4 className="card__details-name">{title.toLowerCase()}</h4>
              <p className="card__details-price">${price}</p>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Card;
