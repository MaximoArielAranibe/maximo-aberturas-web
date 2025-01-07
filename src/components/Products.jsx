import React, { useContext, useMemo, useRef, useState } from 'react';
import { ProductsContext } from '../context/ProductsProvider';
import '../styles/products.scss';
import ButtonCart from './ButtonCart.jsx';
import SvgCart from './icons/SvgCart.jsx';
import { Title } from './Title.jsx';
import formatPrice from '../hooks/formatPrice.js';
import { CartContext } from '../context/CartProvider.jsx';

const Products = ({ category }) => {
  const { products } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext)
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);


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

  const CATEGORY_TITLES = {
    aislantes: 'aislantes',
    portones: 'portones',
    puertas: 'puertas',
    ventanas: 'ventanas',
    'ventanas-balcon': 'ventanas balcón',
    'puertas-placas': 'puertas placas',
    rejas: 'rejas',
    'rejas-balcon': 'rejas balcón',
    'puerta-reja': 'puerta rejas',
    'rajas-de-abrir': 'rajas de abrir'
  };

  const filteredProducts = useMemo(() => {
    return category
      ? products.filter((product) => product.category === category)
      : products;
  }, [products, category]);

  const categoryTitle = CATEGORY_TITLES[category] || 'Upsss.. el producto que buscas no existe!';

  return (
    <section className="products">
      <Title link={categoryTitle} toLink={category} titleStyle="products__title poppins-bold" />
      <ul className="products__container"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove} >
        {filteredProducts.map(({ id, thumbnail, title, price }) => (
          <li key={id} className="product">
            <img src={thumbnail} alt={title} className="product__thumbnail" />
            <h3 className="product__title open-sans-bold">
              {title}
              {" "}
            </h3>
            <p className="product__price poppins-bold">${formatPrice(price)}</p>
            <ButtonCart action={() => addToCart({ id, title, price, thumbnail })} text='Agregar al carrito' icon={<SvgCart />} />
            <ButtonCart text='Ver más información' />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Products;