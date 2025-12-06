import React from 'react'
import './Spinner.css'

function Spinner({ 
  variant = 'primary',
  size = 'medium',
  type = 'border',
  text = ''
}) {
  return (
    <div className="spinner-wrapper">
      <div className={`spinner-${type} spinner-${type}-${variant} spinner-${size}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <span className="spinner-text">{text}</span>}
    </div>
  )
}

export default Spinner

