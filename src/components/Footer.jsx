import React from 'react';
import '../styles/footer.scss';
import GoogleMap from './GoogleMap.jsx';


const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <div className="footer__row footer__social-links">
          <a href="#" className="footer__link">
            <i className="footer__icon fa fa-facebook"></i>
          </a>
          <a href="#" className="footer__link">
            <i className="footer__icon fa fa-instagram"></i>
          </a>
        </div>


        <div className="footer__row footer__info">
          <h3 className="">Dirección📍</h3>
          <h3>Saucedo 270</h3>
          <h3>entre Corrientes y Chacabuco.</h3>

        </div>
        <div className="footer__row footer__info">
          <h3>Horarios🕝</h3>
          <h3>Lunes a Viernes - 09:00hs a 16:00hs</h3>
          <h3>Sabadó - 10:00hs a 13:00hs</h3>
        </div>
        <div className="footer__row footer__info">
          <h3>Medios de contacto☎️</h3>
          <a href='tel:+5492477567514' className="footer__tel"><h3>(2477)15-567514</h3></a>
          <a href='tel:+5492477451735' className="footer__tel"><h3>(2477)15-451735</h3></a>
        </div>
      </div>
      <GoogleMap />
      <div className="footer__row footer__copyright">
        Maximo Aberturas Copyright © 2024 Pergamino - Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
