import React from 'react'
import './Select.css'

function Select({ 
  label = 'Select',
  options = ['Option 1', 'Option 2', 'Option 3'],
  placeholder = 'Choose...',
  multiple = false,
  size = 'medium'
}) {
  const id = `select-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="form-group">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <select
        className={`form-select form-select-${size}`}
        id={id}
        multiple={multiple}
      >
        {placeholder && !multiple && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default Select

