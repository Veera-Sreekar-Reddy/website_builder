import React from 'react'
import './Badge.css'

function Badge({ text = 'Badge', variant = 'primary', pill = false, size = 'medium' }) {
  return (
    <span className={`badge badge-${variant} ${pill ? 'badge-pill' : ''} badge-${size}`}>
      {text}
    </span>
  )
}

export default Badge

