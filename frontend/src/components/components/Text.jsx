import React from 'react'
import './Text.css'

function Text({ content = 'Text Content', fontSize = 16, color = '#000000' }) {
  return (
    <p className="text-component" style={{ fontSize: `${fontSize}px`, color }}>
      {content}
    </p>
  )
}

export default Text

