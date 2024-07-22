import React from 'react';
import '../styles/button.scss'


const Button = ({text, action, marginToTop, className}) => {
  return (
    <button className={`btn-12 ${className}`} onClick={action} style={{marginTop:marginToTop}}>
      <span>{text}</span>
    </button>
  )
}

export default Button