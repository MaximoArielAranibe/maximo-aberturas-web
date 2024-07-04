import React from 'react';
import useProducts from '../hooks/useProducts';
import Carousel from './Carousel';
import '../styles/main.scss'

const Main = () => {
  const products = useProducts();

  return (
    <div className='main__container'>
      <Carousel />
      {products.map(({ title, measure, description, price, available, thumbnail, categoria }, index) => (
        <div key={index}>
          <ul>
            <li>
              <h4>{title}</h4>
              <p>Medida: {measure}</p>
              <p>Descripción: {description}</p>
              <p>Precio: ${price}</p>
              <p>Precio: ${categoria}</p>
              <p>Disponible: {available ? 'Sí' : 'No'}</p>
              <img src={thumbnail} alt={title} width='200px' height='200px' />
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Main;
