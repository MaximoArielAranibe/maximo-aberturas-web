import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext([]);

const CartProvider = ({ children }) => {
  const [total, setTotal] = useState(() => {
    const savedTotal = localStorage.getItem('total');
    return savedTotal ? JSON.parse(savedTotal) : 0;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', JSON.stringify(total));
  }, [cart, total]);

  const addToCart = (item) => {
    if (!item) return;

    setCart((prevCart) => {
      const existingProduct = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingProduct) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });

    setTotal((prevTotal) => prevTotal + item.price);
  };

  const deleteFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    const removedItem = cart.find((product) => product.id === id);

    if (removedItem) {
      setTotal((prevTotal) => prevTotal - removedItem.price * removedItem.quantity);
    }

    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, deleteFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
