import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__brand">
          <Link className="navbar__logo" to="/">
            <div className="navbar__logo--container">
              <h5 className="navbar__logo--h5 noto-sans-bold">Maximo</h5>
              <h5 className="navbar__logo--h5 noto-sans-bold">Aberturas</h5>
            </div>
          </Link>

          <button className={`navbar__burger ${isOpen ? 'is-active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

          </button>
        </div>

      </nav>
      <div className={`navbar__menu ${isOpen ? 'is-active' : ''}`}>
        <ul className="navbar__start">
          <li className="navbar__item"><Link to="/puertas">Puertas</Link></li>
          <li className="navbar__item"><Link to="/puertas-placas">Puertas placas</Link></li>
          <li className="navbar__item"><Link to="/portones">Portones</Link></li>
          <li className="navbar__item"><Link to="/ventanas">Ventanas</Link></li>
          <li className="navbar__item"><Link to="/rajas-de-abrir">Rajas de abrir</Link></li>
          <li className="navbar__item"><Link to="/rejas">Rejas</Link></li>
          <li className="navbar__item"><Link to="/aislantes">Aislantes</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
