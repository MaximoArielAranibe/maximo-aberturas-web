import '../styles/landing.scss'
import React from 'react'
import Card from './Card.jsx'
import Button from './Button.jsx'

const Landing = () => {
	return (
		<header className='landing'>
			<h1 className='landing__title'>Las mejores aberturas de aluminio para tu hogar</h1>
			<Card />
			<Button className="landing__button"/>
		</header>
	)
}

export default Landing