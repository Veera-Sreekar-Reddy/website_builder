import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Button from './components/Button'
import Text from './components/Text'
import Image from './components/Image'
import Container from './components/Container'
import FlexGrid from './components/FlexGrid'
import Heading from './components/Heading'
import Input from './components/Input'
import Dropdown from './components/Dropdown'
import ImageCarousel from './components/ImageCarousel'
import Navigation from './components/Navigation'
import Alert from './components/Alert'
import Badge from './components/Badge'
import Card from './components/Card'
import Table from './components/Table'
import Checkbox from './components/Checkbox'
import Radio from './components/Radio'
import Select from './components/Select'
import Textarea from './components/Textarea'
import Progress from './components/Progress'
import Spinner from './components/Spinner'
import Accordion from './components/Accordion'
import ListGroup from './components/ListGroup'
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import Pagination from './components/Pagination'
import './ComponentRenderer.css'

const COMPONENT_MAP = {
  Button,
  Text,
  Image,
  Container,
  FlexGrid,
  Heading,
  Input,
  Dropdown,
  ImageCarousel,
  Navigation,
  Alert,
  Badge,
  Card,
  Table,
  Checkbox,
  Radio,
  Select,
  Textarea,
  Progress,
  Spinner,
  Accordion,
  ListGroup,
  Modal,
  Navbar,
  Pagination
}

function ComponentRenderer({ component, isSelected, onSelect, onUpdate, onDelete, index, onMove, selectedComponent, onAddComponent }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'canvas-component',
    item: { id: component.id, index, type: component.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [{ isOver }, drop] = useDrop({
    accept: ['component', 'canvas-component'],
    drop: (item, monitor) => {
      // Only handle drops if this is a Container or FlexGrid component
      if ((component.type === 'Container' || component.type === 'FlexGrid') && item.type && !item.id && onAddComponent) {
        // Adding new component to container/grid
        onAddComponent(item.type, component.id)
        return { parentId: component.id, handled: true }
      }
      if (item.id && item.id !== component.id) {
        // Reordering existing component
        onMove(item.id, index)
      }
      return { parentId: component.id }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  const Component = COMPONENT_MAP[component.type]

  if (!Component) {
    return <div>Unknown component: {component.type}</div>
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onSelect(component)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm('Delete this component?')) {
      onDelete(component.id)
    }
  }

  const dragDropRef = (node) => {
    // Only attach drag to wrapper if it's not a container/grid (those handle their own drops)
    if (component.type !== 'Container' && component.type !== 'FlexGrid') {
      drag(drop(node))
    } else {
      drag(node) // Only make it draggable, drop is handled by inner div
    }
  }

  const getStyle = () => {
    const props = component.props || {}
    const style = {}
    
    if (props.borderRadius !== undefined) {
      style.borderRadius = `${props.borderRadius}px`
    }
    if (props.borderWidth !== undefined) {
      style.borderWidth = `${props.borderWidth}px`
      style.borderStyle = 'solid'
    }
    if (props.borderColor) {
      style.borderColor = props.borderColor
    }
    if (props.opacity !== undefined) {
      style.opacity = props.opacity
    }
    if (props.textAlign) {
      style.textAlign = props.textAlign
    }
    if (props.fontFamily) {
      style.fontFamily = props.fontFamily
    }
    if (props.fontWeight) {
      style.fontWeight = props.fontWeight
    }
    
    // Box shadow
    const shadows = {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    }
    if (props.boxShadow && props.boxShadow !== 'none') {
      style.boxShadow = shadows[props.boxShadow] || shadows.md
    }
    
    // Gradient background
    if (props.backgroundType === 'gradient' && props.gradientStart && props.gradientEnd) {
      const direction = props.gradientDirection || 'to right'
      style.background = `linear-gradient(${direction}, ${props.gradientStart}, ${props.gradientEnd})`
    }
    
    // Custom CSS
    if (props.customCSS) {
      const customStyles = props.customCSS.split(';').reduce((acc, rule) => {
        const [key, value] = rule.split(':').map(s => s.trim())
        if (key && value) {
          acc[key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = value
        }
        return acc
      }, {})
      Object.assign(style, customStyles)
    }
    
    return style
  }

  return (
    <div
      ref={dragDropRef}
      className={`component-wrapper ${isSelected ? 'selected' : ''} ${isOver ? 'drag-over' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={handleClick}
      style={getStyle()}
    >
      {isSelected && (
        <div className="component-controls">
          <button className="control-btn delete-btn" onClick={handleDelete}>
            ×
          </button>
        </div>
      )}
      {component.type === 'Container' || component.type === 'FlexGrid' ? (
        <div 
          ref={drop} 
          style={{ 
            minHeight: '50px', 
            position: 'relative',
            width: '100%',
            height: '100%'
          }}
          className={isOver ? 'drop-target-active' : ''}
        >
          <Component {...component.props}>
            {component.children && component.children.map((child, childIndex) => (
              <div key={child.id} style={{ width: '100%', minHeight: '50px' }}>
                <ComponentRenderer
                  component={child}
                  isSelected={selectedComponent?.id === child.id}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  index={childIndex}
                  onMove={() => {}}
                  selectedComponent={selectedComponent}
                  onAddComponent={onAddComponent}
                />
              </div>
            ))}
          </Component>
        </div>
      ) : (
        <Component {...component.props} />
      )}
    </div>
  )
}

export default ComponentRenderer

