import React, { useRef, useState } from 'react';
import '../styles/card.scss';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../hooks/formatPrice.js'

const Card = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const products = useProducts();

  // Filtra los productos que pertenecen a la categoría "puertas"
  const filteredProducts = products.filter(product => product.category === 'puertas');

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
    const walk = (x - startX) * 1; // Ajusta la velocidad de desplazamiento
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
      {filteredProducts.map(({ id, title, price, thumbnail, isInOffer }) => (
        <div className="card" key={id}>
          <picture className="card__thumbnail">
            <img
              className="card__thumbnail-img"
              src={thumbnail}
              alt={title} />
            <div className="card__thumbnail-shadow"></div>
          </picture>
          <div>{isInOffer ? <h3 className="card__offer">OFERTA</h3> : <h3></h3>}</div>
          <div className="card__details">
            <h4 className="card__details-name">{title.toLowerCase()}</h4>
            <p className="card__details-price">${formatPrice(price)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
