import React from 'react'
import { useDrop } from 'react-dnd'
import ComponentRenderer from './ComponentRenderer'
import './Editor.css'

function Editor({ components, selectedComponent, onSelectComponent, onUpdateComponent, onDeleteComponent, onAddComponent, onMoveComponent }) {
  const [{ isOver }, drop] = useDrop({
    accept: ['component', 'canvas-component'],
    drop: (item, monitor) => {
      if (item.id && onMoveComponent) {
        // Reordering existing component - move to end
        onMoveComponent(item.id, components.length)
      } else if (item.type && onAddComponent) {
        // Adding new component from palette
        onAddComponent(item.type)
      }
      return { type: 'canvas' }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <div 
      ref={drop}
      className={`editor ${isOver ? 'drag-over' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onSelectComponent(null)
        }
      }}
    >
      <div className="editor-header">
        <h3>Canvas</h3>
        <span className="component-count">{components.length} components</span>
      </div>
      <div className="editor-canvas">
        {components.length === 0 ? (
          <div className="empty-canvas">
            <p>Drag components here to start building</p>
          </div>
        ) : (
          components.map((component, index) => (
            <ComponentRenderer
              key={component.id}
              component={component}
              index={index}
              isSelected={selectedComponent?.id === component.id}
              onSelect={onSelectComponent}
              onUpdate={onUpdateComponent}
              onDelete={onDeleteComponent}
              onMove={onMoveComponent}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Editor

