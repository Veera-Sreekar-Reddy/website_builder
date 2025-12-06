import React from 'react'
import './ListGroup.css'

function ListGroup({ 
  items = ['Item 1', 'Item 2', 'Item 3'],
  flush = false,
  numbered = false
}) {
  const Tag = numbered ? 'ol' : 'ul'
  
  return (
    <Tag className={`list-group ${flush ? 'list-group-flush' : ''} ${numbered ? 'list-group-numbered' : ''}`}>
      {items.map((item, index) => (
        <li key={index} className="list-group-item">
          {typeof item === 'string' ? item : item.content || item.label}
        </li>
      ))}
    </Tag>
  )
}

export default ListGroup

