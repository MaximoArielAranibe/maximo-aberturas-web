import React from 'react';
import '../styles/button.scss'


const Button = ({text, action, marginToTop}) => {
  return (
    <button className="btn-12" onClick={action} style={{marginTop:marginToTop}}>
      <span>{text}</span>
    </button>
  )
}

export default Button