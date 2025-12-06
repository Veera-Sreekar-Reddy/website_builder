import React from 'react'
import './Input.css'

function Input({ placeholder = 'Enter text...', type = 'text', color = '#000000', backgroundColor = '#ffffff', borderColor }) {
  const style = {
    color,
    backgroundColor
  }
  if (borderColor) style.borderColor = borderColor

  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      className="input-component"
      style={style}
    />
  )
}

export default Input

