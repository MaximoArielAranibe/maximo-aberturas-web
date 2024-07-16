import React from 'react'
import '../styles/landing.scss'
import Button from './Button'
import productThumbnail from '../assets/images/puerta-roma.png'

const Landing = () => {
  return (
    <section className='landing__container'>
      <div className='landing'>
      <h3 className='landing__title'><span>Las mejores aberturas</span> de aluminio <span>reforzado para tu hogar!</span></h3>
      <div className="landing__card">
        <div className="landing__card--wrapper">
          <p className='landing__card--oferta'>OFERTA</p>
          <img className='landing__card--thumbnail' src={productThumbnail} alt="puerta-nova-simil-madera" />
          <h5 className='landing__card--name'>Puerta Roma</h5>
          <p className='landing__card--price'>$320.000</p>
        </div>
      </div>
      <Button text='Conoce más' action={() => document.getElementById('carousel').scrollIntoView({ behavior: 'smooth' })} marginToTop={"1rem"} />
      </div>
    </section>
  );
};

export default Landing