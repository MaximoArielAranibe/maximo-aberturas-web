import React from 'react'
import '../styles/landing.scss'
import Button from './Button'

const Landing = () => {
  return (
    <section className='landing__container'>
      <div className='landing'>
      <h3 className='landing__title'>Las mejores aberturas <span>de aluminio reforzado</span> para tu hogar!</h3>
      <Button text='Conoce más' action={() => document.getElementById('carousel').scrollIntoView({ behavior: 'smooth' })} />
      </div>
    </section>
  )
}

export default Landing