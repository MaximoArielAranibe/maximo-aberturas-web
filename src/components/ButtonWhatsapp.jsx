import React from 'react';
import '../styles/buttonwhatsapp.scss'

const ButtonWhatsapp = ({ text = 'Finalizar compra por WhatsApp', loading = false, disabled = false, action }) => {
  return (
    <button type="button" className='buttonwhatsapp' onClick={action} disabled={disabled || loading}>
      {loading ? 'Generando pedido...' : text}
    </button>
  );
};

export default ButtonWhatsapp;
