import React, { useState } from 'react'
import './Dropdown.css'

function Dropdown({ label = 'Select', options = [], placeholder = 'Select an option', color = '#000000', backgroundColor = '#ffffff', borderColor = '#dddddd' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleSelect = (option) => {
    setSelected(option)
    setIsOpen(false)
  }

  return (
    <div className="dropdown-wrapper">
      {label && <label className="dropdown-label" style={{ color }}>{label}</label>}
      <div className="dropdown-container">
        <button
          className="dropdown-button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor,
            borderColor,
            color
          }}
        >
          <span>{selected || placeholder}</span>
          <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && (
          <div className="dropdown-menu" style={{ backgroundColor, borderColor }}>
            {options.map((option, index) => (
              <div
                key={index}
                className="dropdown-option"
                onClick={() => handleSelect(option)}
                style={{ color }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown

