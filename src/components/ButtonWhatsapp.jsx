import React from 'react';
import { formatPrice } from '../hooks/formatPrice.js';

const ButtonWhatsapp = ({ cart, total }) => {
  const generateMessage = () => {
    if (cart.length === 0) {
      return "Hola, quiero consultar sobre mi carrito, pero está vacío.";
    }

    let message = "Hola, quiero comprar los siguientes productos:\n\n";
    cart.forEach((item) => {
      message += `- ${item.title} (x${item.quantity}): $${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\nTotal: $${total}`;
    return encodeURIComponent(message); // Codificar mensaje
  };

  const whatsappUrl = `https://wa.me/+5492477567514?text=${generateMessage()}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#1653BF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Finalizar compra
      </button>
    </a>
  );
};

export default ButtonWhatsapp;
