import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

  const notifyAdd = () => {
    toast.success("Producto agregado al carrito",
      { position: "bottom-center" })
  }

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

    notifyAdd();
    setTotal((prevTotal) => prevTotal + item.price);
  };

  const deleteFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    const removedItem = cart.find((product) => product.id === id);

    if (removedItem) {
      setTotal((prevTotal) => prevTotal - removedItem.price * removedItem.quantity);
    }
    toast.error("Producto eliminado del carrito",
      { position: "bottom-center" })
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
    toast.error("Has vaciado el carrito", { position: 'bottom-center' })
  };

  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    const item = cart.find((product) => product.id === id);
    if (item) {
      setTotal((prevTotal) => prevTotal + item.price);
    }
    toast.success("Cantidad agregada", { position: 'bottom-center' })
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Eliminar elementos con quantity = 0
    );
    const item = cart.find((product) => product.id === id);
    if (item && item.quantity > 1) {
      setTotal((prevTotal) => prevTotal - item.price);
      toast.error("Cantidad eliminada",
        { position: "bottom-center" })
    }

  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, deleteFromCart, clearCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
