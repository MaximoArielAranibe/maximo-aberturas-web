import React from 'react';
import useProducts from '../hooks/useProducts';

const Main = () => {
  const products = useProducts();

  return (
    <div>
      {products.map(({ title, measure, description, price, available, thumbnail, categoria }, index) => (
        <div key={index}>
          <ul>
            <li>
              <h4>{title}</h4>
              <p>Medida: {measure}</p>
              <p>Descripción: {description}</p>
              <p>Precio: ${price}</p>
              <p>Disponible: {available ? 'Sí' : 'No'}</p>
              <img src={thumbnail} alt={title} />
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Main;
