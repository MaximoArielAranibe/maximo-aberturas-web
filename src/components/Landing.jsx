import React from 'react';
import '../styles/landing.scss';
import Button from './Button';
import productThumbnail from '../assets/images/puerta-roma.png';

const Landing = () => {
	return (
		<section className="landing">
			<div className="landing__content">

				<div className="landing__title">
					<h3 className="landing__title-h3">
						Las mejores <span className="landing__title-span">aberturas de aluminio</span> reforzado para hogar!
					</h3>
				</div>

				<div className="landing__card">
					<span className="landing__card-offer">OFERTA</span>
					<div className="landing__card-thumbnail">
						<img className="landing__card-thumbnail-img" src={productThumbnail} alt="puerta-nova-simil-madera" />
						<div className="landing__card-thumbnail-shadow"></div>
					</div>

					<div className="landing__card-details">
						<h4 className="landing__card-details-name">Puerta Roma</h4>
						<p className="landing__card-details-price">$320.000</p>
					</div>

				</div>

				<div className='landing__button-container'>
					<Button className="landing__button" text="Conoce más" action={() => document.getElementById('carousel').scrollIntoView({ behavior: 'smooth' })} />
				</div>
			</div>
		</section>
	);
};

export default Landing;
