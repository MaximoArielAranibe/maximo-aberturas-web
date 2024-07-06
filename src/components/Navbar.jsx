import '../styles/navbar.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

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

          <div className="navbar__cart">
            <Link to='/carrito'>Carrito <FontAwesomeIcon icon={faCartShopping} /></Link>
          </div>

          <button className={`navbar__burger ${isOpen ? 'is-active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`navbar__menu ${isOpen ? 'is-active' : ''}`}>
          <ul className="navbar__menu--list">
            <li className="navbar__menu--item open-sans-bold"><Link to="/aislantes">Aislantes</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="/portones">Portones</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="/puertas">Puertas</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="/puertas-placas">Puertas placas</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="/rajas-de-abrir">Rajas de abrir</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="/rejas">Rejas</Link></li>
            <li className="navbar__menu--item open-sans-bold"><Link to="/ventanas">Ventanas</Link></li>
          </ul>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
