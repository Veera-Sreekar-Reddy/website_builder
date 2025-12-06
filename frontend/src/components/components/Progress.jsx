import React from 'react'
import './Progress.css'

function Progress({ 
  value = 50,
  max = 100,
  variant = 'primary',
  striped = false,
  animated = false,
  label = '',
  height = ''
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const style = height ? { height } : {}
  
  return (
    <div className="progress" style={style}>
      <div
        className={`progress-bar progress-bar-${variant} ${striped ? 'progress-bar-striped' : ''} ${animated ? 'progress-bar-animated' : ''}`}
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {label || `${percentage}%`}
      </div>
    </div>
  )
}

export default Progress

