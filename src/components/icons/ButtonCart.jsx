import React from 'react'
import '../../styles/buttoncart.scss'

const ButtonCart = ({text, icon}) => {
  return (
    <button className='button__cart noto-sans-bold'>
      {text}
      <span className='button__cart--icon'>{icon}</span>
    </button>
  )
}

export default ButtonCart