import '../styles/navbar.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SvgFind from './icons/SvgFind';
import SvgCart2 from './icons/SvgCart2';
import SvgMenu from './icons/SvgMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__brand" to="/">
            <Link className="navbar__brand--container" to='/'>
              <h5 className="navbar__brand--h5 poppins-bold">Maximo</h5>
              <h5 className="navbar__brand--h5 poppins-bold">Aberturas</h5>
            </Link>
          </div>

          <div className="navbar__cart">
            <Link to=''><SvgFind /></Link>
            <Link to='/cart'><SvgCart2 /></Link>
            <button className={`navbar__burger ${isOpen ? 'is-active' : ''}`} onClick={toggleMenu}><SvgMenu /></button>
          </div>
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
