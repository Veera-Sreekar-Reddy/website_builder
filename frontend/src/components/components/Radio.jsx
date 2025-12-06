import React from 'react'
import './Radio.css'

function Radio({ label = 'Radio', name = 'radio-group', checked = false, disabled = false, inline = false }) {
  const id = `radio-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className={`form-check ${inline ? 'form-check-inline' : ''}`}>
      <input
        className="form-check-input"
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        id={id}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default Radio

