import React, { useContext } from 'react';
import { ProductsContext } from '../context/ProductsProvider';
import '../styles/products.scss';
import { formatPrice } from '../hooks/formatPrice.js';
import ButtonCart from './icons/ButtonCart.jsx';
import SvgCart from './icons/SvgCart.jsx';
import { Title } from './Title.jsx';

const Products = ({ category }) => {
  const { products } = useContext(ProductsContext);

  // Función para filtrar productos por categoría
  const getFilteredProducts = (category) => {
    if (!category) return products; // Si no se pasa una categoría, retorna todos los productos
    return products.filter((product) => product.category === category);
  };

  // Filtrar productos por la categoría pasada como argumento
  const filteredProducts = getFilteredProducts(category);

  const getCategoryTitle = (category) => {
    switch (category) {
      case 'aislantes':
        return 'Aislantes';
      case 'portones':
        return 'Portones';
      case 'puertas':
        return 'Puertas';
      case 'ventanas':
        return 'Ventanas';
        case 'ventanas-balcon':
          return 'Ventanas Balcón';
      default:
        return 'Todos los Productos';
    }
  };

  return (
    <section className='products'>
      <ul className='products__container'>
        <Title title={getCategoryTitle(category)} />

        {filteredProducts.map((product) => (
          <li key={product.id} className='product'>
            <img className='product__thumbnail' src={product.thumbnail} alt={product.title} />
            <h3 className='product__title open-sans-bold'>{product.title} {product.measure}</h3>
            <p className='product__description poppins-regular'>{product.description}</p>
            <p className='product__price poppins-bold'>${formatPrice(product.price)}</p>
            <ButtonCart text="Agregar al carrito" icon={<SvgCart />} />
            <ButtonCart text="Ver más información" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Products;
