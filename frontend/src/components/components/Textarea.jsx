import React from 'react'
import './Textarea.css'

function Textarea({ 
  label = 'Textarea',
  placeholder = 'Enter text here...',
  rows = 4,
  disabled = false,
  readonly = false
}) {
  const id = `textarea-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="form-group">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <textarea
        className="form-control"
        id={id}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
      />
    </div>
  )
}

export default Textarea

