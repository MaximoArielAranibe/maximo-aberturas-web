import React from 'react';

const SvgLogo = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 100"
    role="img"
    aria-label="Maximo Aberturas logo"
    width="100%"
    height="100%"
    onClick={onClick} // Llama a la función al hacer clic
    style={{ cursor: 'pointer' }} // Agrega un cursor interactivo
  >
    <rect width="100%" height="100%" fill="none" />
    <text
      x="10%"
      y="50%"
      fontSize="32"
      fontWeight="bold"
      fontFamily="'Poppins', sans-serif"
      fill="#FFF"
      dominantBaseline="start"
      textAnchor="start"
    >
      Maximo
    </text>
    <text
      x="10%"
      y="70%"
      fontSize="32"
      fontWeight="bold"
      fontFamily="'Poppins', sans-serif"
      fill="#007bff"
      dominantBaseline="middle"
      textAnchor="start"
    >
      Aberturas
    </text>
    <rect
      x="210"
      y="30"
      width="40"
      height="50"
      fill="none"
      stroke="#007bff"
      strokeWidth="4"
    />
    <line x1="210" y1="50" x2="230" y2="50" stroke="#007bff" strokeWidth="4" />
    <line x1="230" y1="30" x2="230" y2="80" stroke="#007bff" strokeWidth="4" />
  </svg>
);

export default SvgLogo;
