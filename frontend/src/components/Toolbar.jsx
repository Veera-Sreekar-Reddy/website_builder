import React, { useState } from 'react'
import './Toolbar.css'

function Toolbar({ 
  websiteName, onNameChange, onSave, onPublish, pages = [], currentPageId, onPageChange, 
  onAddPage, onDeletePage, onRenamePage, onUndo, onRedo, canUndo, canRedo, onPreview,
  onDuplicate, canDuplicate, darkMode, onToggleDarkMode, responsiveMode, onResponsiveModeChange,
  showGrid, onToggleGrid, snapToGrid, onToggleSnapToGrid
}) {
  const [editingPageId, setEditingPageId] = useState(null)
  const [editName, setEditName] = useState('')

  const handleStartEdit = (page) => {
    setEditingPageId(page.id)
    setEditName(page.name)
  }

  const handleSaveEdit = (pageId) => {
    if (editName.trim()) {
      onRenamePage(pageId, editName.trim())
    }
    setEditingPageId(null)
    setEditName('')
  }

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <h1 className="toolbar-title">Website Builder</h1>
        <input
          type="text"
          value={websiteName}
          onChange={(e) => onNameChange(e.target.value)}
          className="website-name-input"
          placeholder="Website Name"
        />
        <div className="pages-tabs">
          {pages.map(page => (
            <div
              key={page.id}
              className={`page-tab ${currentPageId === page.id ? 'active' : ''}`}
              onClick={() => onPageChange(page.id)}
            >
              {editingPageId === page.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleSaveEdit(page.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(page.id)
                    if (e.key === 'Escape') setEditingPageId(null)
                  }}
                  className="page-edit-input"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <span 
                    className="page-name"
                    onDoubleClick={() => handleStartEdit(page)}
                  >
                    {page.name}
                  </span>
                  {pages.length > 1 && (
                    <button
                      className="page-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (window.confirm(`Delete "${page.name}"?`)) {
                          onDeletePage(page.id)
                        }
                      }}
                    >
                      ×
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
          <button className="page-add-btn" onClick={onAddPage} title="Add Page">
            +
          </button>
        </div>
      </div>
      <div className="toolbar-center">
        <div className="toolbar-group">
          <button 
            onClick={onUndo} 
            className="btn btn-icon" 
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            ↶
          </button>
          <button 
            onClick={onRedo} 
            className="btn btn-icon" 
            disabled={!canRedo}
            title="Redo (Ctrl+Shift+Z)"
          >
            ↷
          </button>
        </div>
        <div className="toolbar-group">
          <button 
            onClick={onDuplicate} 
            className="btn btn-icon" 
            disabled={!canDuplicate}
            title="Duplicate (Ctrl+D)"
          >
            ⧉
          </button>
          <button 
            onClick={onPreview} 
            className="btn btn-icon"
            title="Preview (Ctrl+Shift+P)"
          >
            👁️
          </button>
        </div>
        <div className="toolbar-group responsive-controls">
          <button 
            className={`btn btn-icon ${responsiveMode === 'desktop' ? 'active' : ''}`}
            onClick={() => onResponsiveModeChange('desktop')}
            title="Desktop View"
          >
            🖥️
          </button>
          <button 
            className={`btn btn-icon ${responsiveMode === 'tablet' ? 'active' : ''}`}
            onClick={() => onResponsiveModeChange('tablet')}
            title="Tablet View"
          >
            📱
          </button>
          <button 
            className={`btn btn-icon ${responsiveMode === 'mobile' ? 'active' : ''}`}
            onClick={() => onResponsiveModeChange('mobile')}
            title="Mobile View"
          >
            📱
          </button>
        </div>
        <div className="toolbar-group">
          <button 
            onClick={onToggleGrid} 
            className={`btn btn-icon ${showGrid ? 'active' : ''}`}
            title="Show Grid"
          >
            ⊞
          </button>
          <button 
            onClick={onToggleSnapToGrid} 
            className={`btn btn-icon ${snapToGrid ? 'active' : ''}`}
            title="Snap to Grid"
          >
            ⊡
          </button>
        </div>
        <div className="toolbar-group">
          <button 
            onClick={onToggleDarkMode} 
            className={`btn btn-icon ${darkMode ? 'active' : ''}`}
            title="Toggle Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      <div className="toolbar-right">
        <button onClick={onSave} className="btn btn-secondary" title="Save (Ctrl+S)">
          Save
        </button>
        <button onClick={onPublish} className="btn btn-primary">
          Publish
        </button>
      </div>
    </div>
  )
}

export default Toolbar

