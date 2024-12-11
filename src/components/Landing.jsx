import '../styles/landing.scss'
import React from 'react'
import Card from './Card.jsx'
import Button from './Button.jsx'
import { Title } from './Title.jsx'

const Landing = () => {
	return (
		<header className='landing'>
			<Title titleStyle="landing__title" title="Las mejores aberturas de aluminio para tu hogar" />
			<Card />
			<Button className="landing__button" />
		</header>
	)
}

export default Landing