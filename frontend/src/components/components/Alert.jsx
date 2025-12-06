import React from 'react'
import './Alert.css'

function Alert({ variant = 'primary', message = 'This is an alert message', dismissible = false, show = true }) {
  if (!show) return null

  return (
    <div className={`alert alert-${variant} ${dismissible ? 'alert-dismissible' : ''}`} role="alert">
      {message}
      {dismissible && (
        <button type="button" className="alert-close" aria-label="Close">
          ×
        </button>
      )}
    </div>
  )
}

export default Alert

