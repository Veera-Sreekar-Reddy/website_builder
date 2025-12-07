import React, { useState, useEffect, useRef, useCallback } from 'react'
import Editor from './components/Editor'
import ComponentPalette from './components/ComponentPalette'
import PropertyPanel from './components/PropertyPanel'
import Toolbar from './components/Toolbar'
import { generateCode } from './utils/codeGenerator'
import { saveWebsite, loadWebsite, publishWebsite } from './utils/api'
import { HistoryManager } from './utils/history'
import { setupKeyboardShortcuts } from './utils/keyboardShortcuts'
import { getDarkMode, setDarkMode } from './utils/theme'
import './App.css'

function App() {
  const [pages, setPages] = useState([
    { id: 'page-1', name: 'Home', components: [] }
  ])
  const [currentPageId, setCurrentPageId] = useState('page-1')
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [websiteId, setWebsiteId] = useState(null)
  const [websiteName, setWebsiteName] = useState('My Website')
  const [darkMode, setDarkModeState] = useState(getDarkMode())
  const [responsiveMode, setResponsiveMode] = useState('desktop') // desktop, tablet, mobile
  const [showGrid, setShowGrid] = useState(false)
  const [snapToGrid, setSnapToGrid] = useState(false)
  const [copiedComponent, setCopiedComponent] = useState(null)
  const [clipboard, setClipboard] = useState(null)
  
  const historyManager = useRef(new HistoryManager())
  const previewWindowRef = useRef(null)
  
  const currentPage = pages.find(p => p.id === currentPageId) || pages[0]
  const components = currentPage?.components || []
  
  // Initialize history
  useEffect(() => {
    historyManager.current.push({ pages, currentPageId, selectedComponent })
  }, [])

  useEffect(() => {
    // Load website if ID exists in URL
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    if (id) {
      loadWebsiteData(id)
    }
    
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }, [darkMode])
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = setupKeyboardShortcuts({
      onUndo: handleUndo,
      onRedo: handleRedo,
      onCopy: handleCopy,
      onPaste: handlePaste,
      onDelete: handleDeleteShortcut,
      onDuplicate: handleDuplicate,
      onSave: handleSave,
      onPreview: handlePreview
    })
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedComponent, components, clipboard])

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

  const handleAddComponent = (type, parentId = null) => {
    const newComponent = {
      id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      props: getDefaultProps(type),
      children: []
    }
    
    if (parentId) {
      // Add to nested component
      setPages(prevPages => {
        const updated = prevPages.map(page => {
          if (page.id === currentPageId) {
            const addToComponent = (comps) => {
              return comps.map(comp => {
                if (comp.id === parentId) {
                  return {
                    ...comp,
                    children: [...(comp.children || []), newComponent]
                  }
                }
                if (comp.children && comp.children.length > 0) {
                  return {
                    ...comp,
                    children: addToComponent(comp.children)
                  }
                }
                return comp
              })
            }
            return {
              ...page,
              components: addToComponent(page.components)
            }
          }
          return page
        })
        historyManager.current.push({ pages: updated, currentPageId, selectedComponent })
        return updated
      })
    } else {
      updateCurrentPageComponents([...components, newComponent])
    }
  }

  const handleUpdateComponent = (id, updates) => {
    setPages(prevPages => {
      const updatedPages = prevPages.map(page => {
        if (page.id === currentPageId) {
          const updateComponentRecursive = (comps) => {
            return comps.map(comp => {
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
                  // Update children if provided
                  if (updates.children !== undefined) {
                    updatedComp.children = updates.children
                  }
                  // Update selectedComponent if it's the one being updated
                  if (selectedComponent?.id === id) {
                    setTimeout(() => setSelectedComponent(updatedComp), 0)
                  }
                  return updatedComp
                }
                const updatedComp = { 
                  ...comp, 
                  ...updates,
                  // Preserve children if not being updated
                  children: updates.children !== undefined ? updates.children : comp.children
                }
                // Update selectedComponent if it's the one being updated
                if (selectedComponent?.id === id) {
                  setTimeout(() => setSelectedComponent(updatedComp), 0)
                }
                return updatedComp
              }
              // Recursively update children
              if (comp.children && comp.children.length > 0) {
                return {
                  ...comp,
                  children: updateComponentRecursive(comp.children)
                }
              }
              return comp
            })
          }
          return { ...page, components: updateComponentRecursive(page.components) }
        }
        return page
      })
      historyManager.current.push({ pages: updatedPages, currentPageId, selectedComponent })
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

  const updateCurrentPageComponents = (newComponents, saveToHistory = true) => {
    setPages(prevPages => {
      const updated = prevPages.map(page => 
        page.id === currentPageId 
          ? { ...page, components: newComponents }
          : page
      )
      
      if (saveToHistory) {
        historyManager.current.push({ pages: updated, currentPageId, selectedComponent })
      }
      
      return updated
    })
  }
  
  // Undo/Redo
  const handleUndo = useCallback(() => {
    const state = historyManager.current.undo()
    if (state) {
      setPages(state.pages)
      setCurrentPageId(state.currentPageId)
      setSelectedComponent(state.selectedComponent)
    }
  }, [])
  
  const handleRedo = useCallback(() => {
    const state = historyManager.current.redo()
    if (state) {
      setPages(state.pages)
      setCurrentPageId(state.currentPageId)
      setSelectedComponent(state.selectedComponent)
    }
  }, [])
  
  // Copy/Paste/Duplicate
  const handleCopy = useCallback(() => {
    if (selectedComponent) {
      setClipboard(JSON.parse(JSON.stringify(selectedComponent)))
    }
  }, [selectedComponent])
  
  const handlePaste = useCallback(() => {
    if (clipboard) {
      const newComponent = {
        ...clipboard,
        id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }
      updateCurrentPageComponents([...components, newComponent])
      setSelectedComponent(newComponent)
    }
  }, [clipboard, components])
  
  const handleDuplicate = useCallback(() => {
    if (selectedComponent) {
      const newComponent = {
        ...selectedComponent,
        id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }
      const index = components.findIndex(c => c.id === selectedComponent.id)
      const newComponents = [...components]
      newComponents.splice(index + 1, 0, newComponent)
      updateCurrentPageComponents(newComponents)
      setSelectedComponent(newComponent)
    }
  }, [selectedComponent, components])
  
  const handleDeleteShortcut = useCallback(() => {
    if (selectedComponent) {
      handleDeleteComponent(selectedComponent.id)
    }
  }, [selectedComponent])
  
  // Preview
  const handlePreview = useCallback(() => {
    const code = generateCode(pages)
    const previewHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview - ${websiteName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: system-ui, -apple-system, sans-serif; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script type="text/babel">
            ${code}
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(React.createElement(GeneratedWebsite));
          </script>
        </body>
      </html>
    `
    
    if (previewWindowRef.current && !previewWindowRef.current.closed) {
      previewWindowRef.current.document.write(previewHTML)
      previewWindowRef.current.focus()
    } else {
      const newWindow = window.open('', '_blank', 'width=1200,height=800')
      newWindow.document.write(previewHTML)
      previewWindowRef.current = newWindow
    }
  }, [pages, websiteName])
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkModeState(newMode)
    setDarkMode(newMode)
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
      FlexGrid: { rows: 2, columns: 2, gap: 16, padding: 20, backgroundColor: '#ffffff' },
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
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
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
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyManager.current.canUndo()}
        canRedo={historyManager.current.canRedo()}
        onPreview={handlePreview}
        onDuplicate={handleDuplicate}
        canDuplicate={!!selectedComponent}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        responsiveMode={responsiveMode}
        onResponsiveModeChange={setResponsiveMode}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        snapToGrid={snapToGrid}
        onToggleSnapToGrid={() => setSnapToGrid(!snapToGrid)}
      />
      <div className="app-content">
        <ComponentPalette 
          searchQuery=""
          onSearchChange={() => {}}
        />
        <Editor
          components={components}
          selectedComponent={selectedComponent}
          onSelectComponent={setSelectedComponent}
          onUpdateComponent={handleUpdateComponent}
          onDeleteComponent={handleDeleteComponent}
          onAddComponent={handleAddComponent}
          onMoveComponent={handleMoveComponent}
          responsiveMode={responsiveMode}
          showGrid={showGrid}
          snapToGrid={snapToGrid}
        />
        <PropertyPanel
          component={selectedComponent}
          onUpdate={handleUpdateComponent}
          onDelete={handleDeleteComponent}
          pages={pages}
          darkMode={darkMode}
        />
      </div>
    </div>
  )
}

export default App

