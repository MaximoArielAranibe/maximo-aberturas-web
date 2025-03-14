import React, { useContext } from 'react'
import { CartContext } from '../context/CartProvider'
import '../styles/cart.scss'
import { formatPrice } from '../hooks/formatPrice'
import ButtonWhatsapp from './ButtonWhatsapp'

const Cart = () => {

  const { cart, total, deleteFromCart, clearCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  if (cart.length === 0) {
    return <div className='cart__empty'><h3>Tu carrito está vacío...</h3></div>;
  }
  return (
    <div className="cart">
      <div className="cart__wrapper">
        <h1 className='cart__title'>Shopping Cart</h1>
        <button className='cart__delete' onClick={() => clearCart()}><span>Vaciar carrito</span></button>
      </div>
      <ul className="cart__items">
        {cart.map(({ id, title, price, quantity, thumbnail }) => (
          <li key={id} className="cart__item">
            <div className="cart__item--wrapper">
              <img className='cart__item--thumbnail' src={thumbnail} alt={title} />
              <h3 className='cart__item--title'>{title}</h3>
            </div>
            <div className="cart__item--quantity">
              <button className="cart__item--quantity--decrement" onClick={() => decrementQuantity(id)}>-</button>
              <p>{quantity}</p>
              <button className="cart__item--quantity--increment" onClick={() => incrementQuantity(id)}>+</button>
            </div>
            <div className="cart__item--wrapper">
              <p className='cart__item--price'>${formatPrice((price * quantity))}</p>
              <button onClick={() => deleteFromCart(id)} className='cart__item--clear'>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <p className='cart__totalQuantity'>
        Productos en el carrito: {cart.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)}
      </p>
      <h2 style={{ fontWeight: "800" }}>Total: <span style={{ fontWeight: "700" }}>${formatPrice(total)}</span></h2>
      <ButtonWhatsapp cart={cart} total={formatPrice(total)} />
    </div>
  );
};

export default Cart