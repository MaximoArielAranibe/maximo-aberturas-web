import React from 'react';
import '../styles/button.scss'


const Button = ({text, action}) => {
  return (
    <button class="btn-12" onClick={action}>
      <span>{text}</span>
    </button>
  )
}

export default Button