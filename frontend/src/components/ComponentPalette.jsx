import React, { useState, useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { COMPONENT_TEMPLATES } from '../utils/componentTemplates'
import './ComponentPalette.css'

const COMPONENT_TYPES = [
  // Basic Components
  { type: 'Container', icon: '📦', label: 'Container' },
  { type: 'FlexGrid', icon: '⊞', label: 'Flex Grid' },
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

function DraggableTemplate({ templateKey, template }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'template',
    item: { templateKey },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <div
      ref={drag}
      className={`palette-item palette-template ${isDragging ? 'dragging' : ''}`}
      title={template.description}
    >
      <span className="palette-icon">{template.icon}</span>
      <div className="palette-template-info">
        <span className="palette-label">{template.name}</span>
        <span className="palette-description">{template.description}</span>
      </div>
    </div>
  )
}

function ComponentPalette({ searchQuery = '', onSearchChange = () => {} }) {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('templates') // 'components' or 'templates'
  
  const filteredComponents = useMemo(() => {
    if (!search) return COMPONENT_TYPES
    const query = search.toLowerCase()
    return COMPONENT_TYPES.filter(comp => 
      comp.label.toLowerCase().includes(query) || 
      comp.type.toLowerCase().includes(query)
    )
  }, [search])
  
  const filteredTemplates = useMemo(() => {
    if (!search) return Object.entries(COMPONENT_TEMPLATES)
    const query = search.toLowerCase()
    return Object.entries(COMPONENT_TEMPLATES).filter(([key, template]) => 
      template.name.toLowerCase().includes(query) || 
      template.description.toLowerCase().includes(query) ||
      key.toLowerCase().includes(query)
    )
  }, [search])
  
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)
    onSearchChange(value)
  }
  
  return (
    <div className="component-palette">
      <div className="palette-header">
        <div className="palette-tabs">
          <button 
            className={`palette-tab ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            Templates
          </button>
          <button 
            className={`palette-tab ${activeTab === 'components' ? 'active' : ''}`}
            onClick={() => setActiveTab('components')}
          >
            Components
          </button>
        </div>
        <input
          type="text"
          className="palette-search"
          placeholder={`Search ${activeTab}...`}
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="palette-list">
        {activeTab === 'templates' ? (
          filteredTemplates.length > 0 ? (
            filteredTemplates.map(([key, template]) => (
              <DraggableTemplate
                key={key}
                templateKey={key}
                template={template}
              />
            ))
          ) : (
            <div className="palette-empty">No templates found</div>
          )
        ) : (
          filteredComponents.length > 0 ? (
            filteredComponents.map((comp) => (
              <DraggableComponent
                key={comp.type}
                type={comp.type}
                icon={comp.icon}
                label={comp.label}
              />
            ))
          ) : (
            <div className="palette-empty">No components found</div>
          )
        )}
      </div>
    </div>
  )
}

export default ComponentPalette

