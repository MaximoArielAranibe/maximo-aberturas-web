import React, { useContext } from 'react'
import { CartContext } from '../context/CartProvider'
import '../styles/cart.scss'

const Cart = () => {

  const { cart, total, deleteFromCart, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return <div>Tu carrito está vacio</div>;
  }
  return (
    <div className="cart">
      <h1 className='cart__title'>Carrito de Compras</h1>
      <ul className="cart__items">
        {cart.map(({ id, title, price, quantity, category }) => (
          <li key={id} className="cart__item">
            <h3 className='cart__item--title'>{title}</h3>
            <p className='cart__item--price'>Precio: ${price}</p>
            <p className='cart__item--quantity'>Cantidad: {quantity}</p>
            <button className='cart__item--delete' onClick={() => deleteFromCart(id)}>Eliminar</button>
          </li>
        ))}
      </ul>
        <button className='cart__delete' onClick={() => clearCart()}>Vaciar carrito</button>
      <h2>Total: ${total}</h2>
    </div>
  );
};

export default Cart