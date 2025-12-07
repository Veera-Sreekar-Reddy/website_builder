import React from 'react'
import './FlexGrid.css'

function FlexGrid({ 
  rows = 1, 
  columns = 2, 
  gap = 16, 
  backgroundColor = '#ffffff',
  padding = 20,
  backgroundType,
  gradientStart,
  gradientEnd,
  gradientDirection,
  children,
  ...otherProps 
}) {
  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridAutoRows: 'minmax(50px, auto)',
    gap: `${gap}px`,
    padding: `${padding}px`,
    ...otherProps
  }
  
  if (backgroundType === 'gradient' && gradientStart && gradientEnd) {
    const direction = gradientDirection || 'to right'
    style.background = `linear-gradient(${direction}, ${gradientStart}, ${gradientEnd})`
  } else {
    style.backgroundColor = backgroundColor
  }
  
  return (
    <div 
      className="flex-grid-component"
      style={style}
    >
      {children}
    </div>
  )
}

export default FlexGrid

