import React from 'react';
import '../styles/button.scss'


const Button = ({ text, action, className }) => {
  return (
    <button className={`btn-12 ${className}`} onClick={action}>
      <span>{text}</span>
    </button>
  )
}

export default Button