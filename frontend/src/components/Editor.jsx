import React from 'react'
import { useDrop } from 'react-dnd'
import ComponentRenderer from './ComponentRenderer'
import './Editor.css'

function Editor({ components, selectedComponent, onSelectComponent, onUpdateComponent, onDeleteComponent, onAddComponent, onAddTemplate, onMoveComponent, responsiveMode = 'desktop', showGrid = false, snapToGrid = false }) {
  const [{ isOver }, drop] = useDrop({
    accept: ['component', 'canvas-component', 'template'],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        // Check if it was dropped into a container/grid
        const dropResult = monitor.getDropResult()
        if (dropResult && dropResult.parentId && dropResult.handled) {
          // Already handled by the container/grid drop target
          return dropResult
        }
        return // Already handled by nested drop target
      }
      
      if (item.id && onMoveComponent) {
        // Reordering existing component - move to end
        onMoveComponent(item.id, components.length)
      } else if (item.templateKey && onAddTemplate) {
        // Adding template from palette - add to canvas
        onAddTemplate(item.templateKey)
      } else if (item.type && onAddComponent) {
        // Adding new component from palette - add to canvas
        onAddComponent(item.type)
      }
      return { type: 'canvas' }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  const getResponsiveClass = () => {
    switch (responsiveMode) {
      case 'tablet': return 'editor-tablet'
      case 'mobile': return 'editor-mobile'
      default: return 'editor-desktop'
    }
  }
  
  return (
    <div 
      ref={drop}
      className={`editor ${isOver ? 'drag-over' : ''} ${getResponsiveClass()} ${showGrid ? 'show-grid' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onSelectComponent(null)
        }
      }}
    >
      <div className="editor-header">
        <h3>Canvas</h3>
        <span className="component-count">{components.length} components</span>
        <span className="responsive-indicator">{responsiveMode}</span>
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
                     selectedComponent={selectedComponent}
                     onAddComponent={onAddComponent}
                     onAddTemplate={onAddTemplate}
                   />
                 ))
        )}
      </div>
    </div>
  )
}

export default Editor

