import React from 'react';
import { useNavigate } from 'react-router-dom';

const SvgLogo = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // Redirige al inicio
    setTimeout(() => {
      // Desplaza la ventana al inicio absoluto
      window.scrollTo({ top: -100, behavior: 'smooth' });

      // Opcionalmente, intenta posicionarte en el landing-section si existe
      const landingSection = document.getElementById('landing-section');
      if (landingSection) {
        landingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Espera un poco para asegurar que la redirección ocurra primero
  };


  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 100"
      role="img"
      aria-label="Maximo Aberturas logo"
      width="100%"
      height="100%"
      onClick={handleClick} // Llama al handleClick en lugar de solo onClick
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
};

export default SvgLogo;
