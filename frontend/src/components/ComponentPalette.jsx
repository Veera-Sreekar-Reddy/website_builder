import React from 'react'
import { useDrag } from 'react-dnd'
import './ComponentPalette.css'

const COMPONENT_TYPES = [
  // Basic Components
  { type: 'Container', icon: '📦', label: 'Container' },
  { type: 'Heading', icon: '📝', label: 'Heading' },
  { type: 'Text', icon: '✏️', label: 'Text' },
  { type: 'Button', icon: '🔘', label: 'Button' },
  { type: 'Image', icon: '🖼️', label: 'Image' },
  { type: 'Input', icon: '📥', label: 'Input' },
  
  // Bootstrap Components
  { type: 'Alert', icon: '⚠️', label: 'Alert' },
  { type: 'Badge', icon: '🏷️', label: 'Badge' },
  { type: 'Card', icon: '🃏', label: 'Card' },
  { type: 'Table', icon: '📊', label: 'Table' },
  { type: 'Progress', icon: '📈', label: 'Progress' },
  { type: 'Spinner', icon: '⏳', label: 'Spinner' },
  { type: 'Accordion', icon: '📑', label: 'Accordion' },
  { type: 'ListGroup', icon: '📋', label: 'List Group' },
  { type: 'Modal', icon: '🪟', label: 'Modal' },
  { type: 'Navbar', icon: '🧭', label: 'Navbar' },
  { type: 'Pagination', icon: '📄', label: 'Pagination' },
  
  // Form Components
  { type: 'Checkbox', icon: '☑️', label: 'Checkbox' },
  { type: 'Radio', icon: '🔘', label: 'Radio' },
  { type: 'Select', icon: '📋', label: 'Select' },
  { type: 'Textarea', icon: '📝', label: 'Textarea' },
  { type: 'Dropdown', icon: '🔽', label: 'Dropdown' },
  
  // Advanced Components
  { type: 'ImageCarousel', icon: '🎠', label: 'Carousel' },
  { type: 'Navigation', icon: '🧭', label: 'Navigation' }
]

function DraggableComponent({ type, icon, label }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <div
      ref={drag}
      className={`palette-item ${isDragging ? 'dragging' : ''}`}
    >
      <span className="palette-icon">{icon}</span>
      <span className="palette-label">{label}</span>
    </div>
  )
}

function ComponentPalette() {
  return (
    <div className="component-palette">
      <h3 className="palette-title">Components</h3>
      <div className="palette-list">
        {COMPONENT_TYPES.map((comp) => (
          <DraggableComponent
            key={comp.type}
            type={comp.type}
            icon={comp.icon}
            label={comp.label}
          />
        ))}
      </div>
    </div>
  )
}

export default ComponentPalette

