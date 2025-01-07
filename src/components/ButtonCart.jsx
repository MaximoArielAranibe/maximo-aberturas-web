import React from 'react'
import '../styles/buttoncart.scss'

const ButtonCart = ({text, icon, action}) => {
  return (
    <button onClick={action} className='button__cart poppins-normal'>
      <span>{text}{icon}</span>
    </button>
  )
}

export default ButtonCart