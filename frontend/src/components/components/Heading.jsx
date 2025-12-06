import React from 'react'
import './Heading.css'

function Heading({ text = 'Heading', level = 1, fontSize = 32, color = '#000000' }) {
  const Tag = `h${level}`
  return (
    <Tag className="heading-component" style={{ fontSize: `${fontSize}px`, color }}>
      {text}
    </Tag>
  )
}

export default Heading

