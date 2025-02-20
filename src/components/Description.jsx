import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsProvider';

const Description = () => {
  const { products } = useContext(ProductsContext);
  const { id } = useParams(); // Obtener el id de la URL
  const product = products.find((p) => p.id === parseInt(id)); // Buscar el producto

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <section className="description">
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
    </section>
  );
};

export default Description;
