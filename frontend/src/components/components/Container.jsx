import React from 'react'
import './Container.css'

function Container({ padding = 20, backgroundColor = '#ffffff', children }) {
  return (
    <div 
      className="container-component"
      style={{ 
        padding: `${padding}px`,
        backgroundColor 
      }}
    >
      {children}
    </div>
  )
}

export default Container

