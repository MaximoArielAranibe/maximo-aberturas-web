import '../styles/navbar.scss';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import SvgCart2 from './icons/SvgCart2';
import SvgMenu from './icons/SvgMenu';
import SvgLogo from './icons/SvgLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();  // Usa useNavigate para la navegación
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = () => {
    const landingSection = document.getElementById('landing-section');
    if (landingSection) {
      landingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToUp = () => {
    const currentPath = window.location.pathname; // Obtenemos la ruta actual

    if (currentPath === '/') {
      // Si estamos en la landing o en la raíz, hacemos scroll al principio
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      // Si estamos en una ruta diferente, redirigimos a la raíz ('/')
      navigate('/'); // Usamos navigate() en lugar de history.push()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  };

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      const offset = -96; // Ajuste en píxeles para que quede más arriba (puedes cambiar este valor)
      const footerPosition = footer.getBoundingClientRect().top + window.scrollY + offset;

      window.scrollTo({
        top: footerPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__brand">
            <SvgLogo onClick={handleLogoClick} />
          </div>

          <div className="navbar__cart">
            <Link to="/cart">
              <SvgCart2 />
            </Link>
            <button
              className={`navbar__burger ${isOpen ? 'is-active' : ''}`}
              onClick={toggleMenu}
            >
              <SvgMenu />
            </button>
          </div>
        </div>

        <div className={`navbar__menu ${isOpen ? 'is-active' : ''}`}>
          <ul className="navbar__menu--list">
            <li className="navbar__menu--item open-sans-bold navbar__contacto" onClick={handleToUp}>
              Inicio
            </li>

            <li
              className="navbar__menu--item open-sans-bold navbar__contacto"
              onClick={scrollToFooter}
            >
              Contacto
            </li>

            <li className="navbar__menu--item open-sans-bold">
              <Link to="categoria/ventanas">Ventanas</Link>
            </li>
            <li className="navbar__menu--item open-sans-bold">
              <Link to="categoria/puertas">Puertas</Link>
            </li>
            <li className="navbar__menu--item open-sans-bold">
              <Link to="categoria/portones">Portones</Link>
            </li>
            <li className="navbar__menu--item open-sans-bold">
              <Link to="categoria/puertas-placas">Puertas placas</Link>
            </li>
            <li className="navbar__menu--item open-sans-bold">
              <Link to="categoria/rajas-de-abrir">Rajas de abrir</Link>
            </li>
            <li className="navbar__menu--item open-sans-bold">
              <Link to="categoria/aislantes">Aislantes</Link>
            </li>
            <li className="navbar__menu--item open-sans-bold">
              <Link to="categoria/rejas">Rejas ventana</Link>
            </li>
            <li className="navbar__menu--item open-sans-bold">
              <Link to="categoria/rejas-balcon">Rejas balcón</Link>
            </li>
            <li className="navbar__menu--item open-sans-bold">
              <Link to="categoria/puerta-reja">Puerta reja</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
