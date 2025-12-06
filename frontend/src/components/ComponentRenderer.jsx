import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Button from './components/Button'
import Text from './components/Text'
import Image from './components/Image'
import Container from './components/Container'
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

function ComponentRenderer({ component, isSelected, onSelect, onUpdate, onDelete, index, onMove }) {
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
    drag(drop(node))
  }

  return (
    <div
      ref={dragDropRef}
      className={`component-wrapper ${isSelected ? 'selected' : ''} ${isOver ? 'drag-over' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={handleClick}
    >
      {isSelected && (
        <div className="component-controls">
          <button className="control-btn delete-btn" onClick={handleDelete}>
            ×
          </button>
        </div>
      )}
      <Component {...component.props} />
    </div>
  )
}

export default ComponentRenderer

