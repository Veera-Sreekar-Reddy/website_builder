import React from 'react'
import './Checkbox.css'

function Checkbox({ label = 'Checkbox', checked = false, disabled = false, inline = false }) {
  const id = `checkbox-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className={`form-check ${inline ? 'form-check-inline' : ''}`}>
      <input
        className="form-check-input"
        type="checkbox"
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

export default Checkbox

