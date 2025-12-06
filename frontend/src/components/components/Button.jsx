import React from 'react'
import './Button.css'

function Button({ text = 'Button', variant = 'primary', size = 'medium', backgroundColor, textColor }) {
  const style = {}
  if (backgroundColor) style.backgroundColor = backgroundColor
  if (textColor) style.color = textColor

  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      style={style}
    >
      {text}
    </button>
  )
}

export default Button

