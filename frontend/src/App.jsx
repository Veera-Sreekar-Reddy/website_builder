import React, { useState, useEffect } from 'react'
import Editor from './components/Editor'
import ComponentPalette from './components/ComponentPalette'
import PropertyPanel from './components/PropertyPanel'
import Toolbar from './components/Toolbar'
import { generateCode } from './utils/codeGenerator'
import { saveWebsite, loadWebsite, publishWebsite } from './utils/api'
import './App.css'

function App() {
  const [pages, setPages] = useState([
    { id: 'page-1', name: 'Home', components: [] }
  ])
  const [currentPageId, setCurrentPageId] = useState('page-1')
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [websiteId, setWebsiteId] = useState(null)
  const [websiteName, setWebsiteName] = useState('My Website')
  
  const currentPage = pages.find(p => p.id === currentPageId) || pages[0]
  const components = currentPage?.components || []

  useEffect(() => {
    // Load website if ID exists in URL
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    if (id) {
      loadWebsiteData(id)
    }
  }, [])

  // Update selectedComponent when currentPage changes to ensure it has latest data
  useEffect(() => {
    if (selectedComponent) {
      const updatedComponent = components.find(comp => comp.id === selectedComponent.id)
      if (!updatedComponent) {
        // Component was deleted or doesn't exist in current page
        setSelectedComponent(null)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageId])

  const loadWebsiteData = async (id) => {
    try {
      const data = await loadWebsite(id)
      if (data.pages && data.pages.length > 0) {
        setPages(data.pages)
        setCurrentPageId(data.pages[0].id)
      } else if (data.components) {
        // Legacy support: convert old single-page format to new multi-page format
        setPages([{ id: 'page-1', name: 'Home', components: data.components }])
        setCurrentPageId('page-1')
      }
      setWebsiteId(data.id)
      setWebsiteName(data.name || 'My Website')
    } catch (error) {
      console.error('Failed to load website:', error)
    }
  }

  const handleSave = async () => {
    try {
      const code = generateCode(pages)
      const data = {
        name: websiteName,
        pages,
        components: components, // Keep for backward compatibility
        generatedCode: code,
        published: false
      }
      
      const result = await saveWebsite(websiteId, data)
      setWebsiteId(result.id)
      alert('Website saved successfully!')
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save website')
    }
  }

  const handlePublish = async () => {
    try {
      const code = generateCode(pages)
      const data = {
        name: websiteName,
        pages,
        components: components, // Keep for backward compatibility
        generatedCode: code,
        published: true
      }
      
      const result = await publishWebsite(websiteId, data)
      setWebsiteId(result.id)
      alert(`Website published! Domain: ${result.domain || 'Pending...'}`)
    } catch (error) {
      console.error('Failed to publish:', error)
      alert('Failed to publish website')
    }
  }

  const handleAddComponent = (type) => {
    const newComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      props: getDefaultProps(type),
      children: []
    }
    updateCurrentPageComponents([...components, newComponent])
  }

  const handleUpdateComponent = (id, updates) => {
    setPages(prevPages => {
      const updatedPages = prevPages.map(page => {
        if (page.id === currentPageId) {
          const updatedComponents = page.components.map(comp => {
            if (comp.id === id) {
              // Deep merge props if updates contains props
              if (updates.props) {
                const updatedComp = {
                  ...comp,
                  props: {
                    ...(comp.props || {}),
                    ...updates.props
                  },
                  ...Object.fromEntries(
                    Object.entries(updates).filter(([key]) => key !== 'props')
                  )
                }
                // Update selectedComponent if it's the one being updated
                if (selectedComponent?.id === id) {
                  setTimeout(() => setSelectedComponent(updatedComp), 0)
                }
                return updatedComp
              }
              const updatedComp = { ...comp, ...updates }
              // Update selectedComponent if it's the one being updated
              if (selectedComponent?.id === id) {
                setTimeout(() => setSelectedComponent(updatedComp), 0)
              }
              return updatedComp
            }
            return comp
          })
          return { ...page, components: updatedComponents }
        }
        return page
      })
      return updatedPages
    })
  }

  const handleDeleteComponent = (id) => {
    updateCurrentPageComponents(components.filter(comp => comp.id !== id))
    if (selectedComponent?.id === id) {
      setSelectedComponent(null)
    }
  }

  const handleMoveComponent = (dragId, hoverIndex) => {
    setPages(prevPages => {
      const updatedPages = prevPages.map(page => {
        if (page.id === currentPageId) {
          const components = [...page.components]
          const dragIndex = components.findIndex(comp => comp.id === dragId)
          
          if (dragIndex === -1 || dragIndex === hoverIndex) {
            return page // No change needed
          }

          // Remove the dragged component
          const [draggedComponent] = components.splice(dragIndex, 1)
          
          // Insert at new position
          const insertIndex = hoverIndex > dragIndex ? hoverIndex - 1 : hoverIndex
          components.splice(insertIndex, 0, draggedComponent)
          
          return { ...page, components }
        }
        return page
      })
      return updatedPages
    })
  }

  const updateCurrentPageComponents = (newComponents) => {
    setPages(prevPages => prevPages.map(page => 
      page.id === currentPageId 
        ? { ...page, components: newComponents }
        : page
    ))
  }

  const handleAddPage = () => {
    const newPage = {
      id: `page-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `Page ${pages.length + 1}`,
      components: []
    }
    setPages([...pages, newPage])
    setCurrentPageId(newPage.id)
  }

  const handleDeletePage = (pageId) => {
    if (pages.length <= 1) {
      alert('Cannot delete the last page')
      return
    }
    const newPages = pages.filter(p => p.id !== pageId)
    setPages(newPages)
    if (currentPageId === pageId) {
      setCurrentPageId(newPages[0].id)
    }
  }

  const handleRenamePage = (pageId, newName) => {
    setPages(pages.map(page => 
      page.id === pageId ? { ...page, name: newName } : page
    ))
  }

  const getDefaultProps = (type) => {
    const defaults = {
      Button: { text: 'Click Me', variant: 'primary', size: 'medium', backgroundColor: '#007bff', textColor: '#ffffff' },
      Text: { content: 'Text Content', fontSize: 16, color: '#000000' },
      Image: { src: 'https://via.placeholder.com/300x200', alt: 'Image' },
      Container: { padding: 20, backgroundColor: '#ffffff' },
      Heading: { text: 'Heading', level: 1, fontSize: 32, color: '#000000' },
      Input: { placeholder: 'Enter text...', type: 'text', color: '#000000', backgroundColor: '#ffffff', borderColor: '#dddddd' },
      Dropdown: { options: ['Option 1', 'Option 2', 'Option 3'], placeholder: 'Select an option', label: 'Select' },
      ImageCarousel: { images: ['https://via.placeholder.com/800x400/007bff/ffffff?text=Image+1', 'https://via.placeholder.com/800x400/28a745/ffffff?text=Image+2', 'https://via.placeholder.com/800x400/dc3545/ffffff?text=Image+3'], autoplay: true, interval: 3000 },
      Navigation: { links: [{ label: 'Home', path: '/' }, { label: 'About', path: '/about' }], style: 'horizontal' },
      Alert: { variant: 'primary', message: 'This is an alert message', dismissible: false, show: true },
      Badge: { text: 'Badge', variant: 'primary', pill: false, size: 'medium' },
      Card: { title: 'Card Title', subtitle: '', text: 'Some quick example text to build on the card title.', image: '', buttonText: 'Go somewhere', buttonVariant: 'primary' },
      Table: { headers: ['Header 1', 'Header 2', 'Header 3'], rows: [['Data 1', 'Data 2', 'Data 3'], ['Data 4', 'Data 5', 'Data 6']], striped: false, bordered: false, hover: false, dark: false },
      Checkbox: { label: 'Checkbox', checked: false, disabled: false, inline: false },
      Radio: { label: 'Radio', name: 'radio-group', checked: false, disabled: false, inline: false },
      Select: { label: 'Select', options: ['Option 1', 'Option 2', 'Option 3'], placeholder: 'Choose...', multiple: false, size: 'medium' },
      Textarea: { label: 'Textarea', placeholder: 'Enter text here...', rows: 4, disabled: false, readonly: false },
      Progress: { value: 50, max: 100, variant: 'primary', striped: false, animated: false, label: '' },
      Spinner: { variant: 'primary', size: 'medium', type: 'border', text: '' },
      Accordion: { items: [{ title: 'Item 1', content: 'Content for item 1' }, { title: 'Item 2', content: 'Content for item 2' }], flush: false, alwaysOpen: false },
      ListGroup: { items: ['Item 1', 'Item 2', 'Item 3'], flush: false, numbered: false },
      Modal: { title: 'Modal Title', body: 'Modal body text goes here.', buttonText: 'Open Modal', buttonVariant: 'primary', size: 'medium', show: false },
      Navbar: { brand: 'Navbar', links: [{ label: 'Home', path: '/' }, { label: 'About', path: '/about' }], variant: 'light', expand: 'md' },
      Pagination: { currentPage: 1, totalPages: 5, size: 'medium', alignment: 'start' }
    }
    return defaults[type] || {}
  }

  return (
    <div className="app">
      <Toolbar 
        websiteName={websiteName}
        onNameChange={setWebsiteName}
        onSave={handleSave}
        onPublish={handlePublish}
        pages={pages}
        currentPageId={currentPageId}
        onPageChange={setCurrentPageId}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage}
        onRenamePage={handleRenamePage}
      />
      <div className="app-content">
        <ComponentPalette />
        <Editor
          components={components}
          selectedComponent={selectedComponent}
          onSelectComponent={setSelectedComponent}
          onUpdateComponent={handleUpdateComponent}
          onDeleteComponent={handleDeleteComponent}
          onAddComponent={handleAddComponent}
          onMoveComponent={handleMoveComponent}
        />
        <PropertyPanel
          component={selectedComponent}
          onUpdate={handleUpdateComponent}
          onDelete={handleDeleteComponent}
          pages={pages}
        />
      </div>
    </div>
  )
}

export default App

