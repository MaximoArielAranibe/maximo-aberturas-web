import '../styles/navbar.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SvgCart2 from './icons/SvgCart2';
import SvgMenu from './icons/SvgMenu';
import SvgLogo from './icons/SvgLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = () => {
    const landingSection = document.getElementById('landing-section');
    if (landingSection) {
      landingSection.scrollIntoView({ behavior: 'smooth' });
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
            <Link to="/cart"><SvgCart2 /></Link>
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
            <li className="navbar__menu--item open-sans-bold"><Link to="/">Inicio</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="categoria/ventanas">Ventanas</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="categoria/puertas">Puertas</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="categoria/portones">Portones</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="categoria/puertas-placas">Puertas placas</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="categoria/rajas-de-abrir">Rajas de abrir</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="categoria/aislantes">Aislantes</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="categoria/rejas">Rejas ventana</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="categoria/rejas-balcon">Rejas balcón</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="categoria/puerta-reja">Puerta reja</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
