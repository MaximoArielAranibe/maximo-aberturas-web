import React from 'react';
import { formatPrice } from '../hooks/formatPrice.js';
import '../styles/buttonwhatsapp.scss'

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
      <button className='buttonwhatsapp'>
        Finalizar compra
      </button>
    </a>
  );
};

export default ButtonWhatsapp;
