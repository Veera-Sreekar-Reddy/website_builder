import React from 'react'
import './PropertyPanel.css'

function PropertyPanel({ component, onUpdate, onDelete }) {
  if (!component) {
    return (
      <div className="property-panel">
        <h3 className="panel-title">Properties</h3>
        <div className="panel-empty">
          <p>Select a component to edit its properties</p>
        </div>
      </div>
    )
  }

  const handlePropChange = (key, value) => {
    // Handle NaN values from parseInt
    if (typeof value === 'number' && isNaN(value)) {
      return // Don't update if value is NaN
    }
    // Ensure props object exists
    const currentProps = component.props || {}
    const updatedProps = {
      ...currentProps,
      [key]: value
    }
    onUpdate(component.id, {
      props: updatedProps
    })
  }

  const handleNumberChange = (key, value, defaultValue = 0) => {
    const numValue = value === '' ? defaultValue : parseInt(value, 10)
    if (!isNaN(numValue)) {
      handlePropChange(key, numValue)
    }
  }

  const renderPropertyInputs = () => {
    const inputs = []

    switch (component.type) {
      case 'Button':
        inputs.push(
          <div key="text" className="property-group">
            <label>Text</label>
            <input
              type="text"
              value={component.props?.text ?? ''}
              onChange={(e) => handlePropChange('text', e.target.value)}
            />
          </div>,
          <div key="variant" className="property-group">
            <label>Variant</label>
            <select
              value={component.props?.variant ?? 'primary'}
              onChange={(e) => handlePropChange('variant', e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="danger">Danger</option>
            </select>
          </div>,
          <div key="size" className="property-group">
            <label>Size</label>
            <select
              value={component.props?.size ?? 'medium'}
              onChange={(e) => handlePropChange('size', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>,
          <div key="backgroundColor" className="property-group">
            <label>Background Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.backgroundColor || '#007bff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.backgroundColor || '#007bff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="color-input"
                placeholder="#007bff"
              />
            </div>
          </div>,
          <div key="textColor" className="property-group">
            <label>Text Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.textColor || '#ffffff'}
                onChange={(e) => handlePropChange('textColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.textColor || '#ffffff'}
                onChange={(e) => handlePropChange('textColor', e.target.value)}
                className="color-input"
                placeholder="#ffffff"
              />
            </div>
          </div>
        )
        break

      case 'Text':
        inputs.push(
          <div key="content" className="property-group">
            <label>Content</label>
            <textarea
              value={component.props?.content ?? ''}
              onChange={(e) => handlePropChange('content', e.target.value)}
              rows={4}
            />
          </div>,
          <div key="fontSize" className="property-group">
            <label>Font Size</label>
            <input
              type="number"
              value={component.props.fontSize ?? 16}
              onChange={(e) => handleNumberChange('fontSize', e.target.value, 16)}
            />
          </div>,
          <div key="color" className="property-group">
            <label>Text Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.color || '#000000'}
                onChange={(e) => handlePropChange('color', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.color || '#000000'}
                onChange={(e) => handlePropChange('color', e.target.value)}
                className="color-input"
                placeholder="#000000"
              />
            </div>
          </div>
        )
        break

      case 'Image':
        inputs.push(
          <div key="src" className="property-group">
            <label>Image URL</label>
            <input
              type="text"
              value={component.props?.src ?? ''}
              onChange={(e) => handlePropChange('src', e.target.value)}
            />
          </div>,
          <div key="alt" className="property-group">
            <label>Alt Text</label>
            <input
              type="text"
              value={component.props?.alt ?? ''}
              onChange={(e) => handlePropChange('alt', e.target.value)}
            />
          </div>
        )
        break

      case 'Container':
        inputs.push(
          <div key="padding" className="property-group">
            <label>Padding</label>
            <input
              type="number"
              value={component.props.padding ?? 20}
              onChange={(e) => handleNumberChange('padding', e.target.value, 20)}
            />
          </div>,
          <div key="backgroundColor" className="property-group">
            <label>Background Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="color-input"
                placeholder="#ffffff"
              />
            </div>
          </div>
        )
        break

      case 'Heading':
        inputs.push(
          <div key="text" className="property-group">
            <label>Text</label>
            <input
              type="text"
              value={component.props?.text ?? ''}
              onChange={(e) => handlePropChange('text', e.target.value)}
            />
          </div>,
          <div key="level" className="property-group">
            <label>Level</label>
            <select
              value={String(component.props.level ?? 1)}
              onChange={(e) => handlePropChange('level', parseInt(e.target.value, 10))}
            >
              <option value="1">H1</option>
              <option value="2">H2</option>
              <option value="3">H3</option>
              <option value="4">H4</option>
            </select>
          </div>,
          <div key="fontSize" className="property-group">
            <label>Font Size</label>
            <input
              type="number"
              value={component.props.fontSize ?? 32}
              onChange={(e) => handleNumberChange('fontSize', e.target.value, 32)}
            />
          </div>,
          <div key="color" className="property-group">
            <label>Text Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.color || '#000000'}
                onChange={(e) => handlePropChange('color', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.color || '#000000'}
                onChange={(e) => handlePropChange('color', e.target.value)}
                className="color-input"
                placeholder="#000000"
              />
            </div>
          </div>
        )
        break

      case 'Input':
        inputs.push(
          <div key="placeholder" className="property-group">
            <label>Placeholder</label>
            <input
              type="text"
              value={component.props?.placeholder ?? ''}
              onChange={(e) => handlePropChange('placeholder', e.target.value)}
            />
          </div>,
          <div key="type" className="property-group">
            <label>Type</label>
            <select
              value={component.props.type || 'text'}
              onChange={(e) => handlePropChange('type', e.target.value)}
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="number">Number</option>
            </select>
          </div>,
          <div key="color" className="property-group">
            <label>Text Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.color || '#000000'}
                onChange={(e) => handlePropChange('color', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.color || '#000000'}
                onChange={(e) => handlePropChange('color', e.target.value)}
                className="color-input"
                placeholder="#000000"
              />
            </div>
          </div>,
          <div key="backgroundColor" className="property-group">
            <label>Background Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="color-input"
                placeholder="#ffffff"
              />
            </div>
          </div>,
          <div key="borderColor" className="property-group">
            <label>Border Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.borderColor || '#dddddd'}
                onChange={(e) => handlePropChange('borderColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.borderColor || '#dddddd'}
                onChange={(e) => handlePropChange('borderColor', e.target.value)}
                className="color-input"
                placeholder="#dddddd"
              />
            </div>
          </div>
        )
        break

      case 'Dropdown':
        inputs.push(
          <div key="label" className="property-group">
            <label>Label</label>
            <input
              type="text"
              value={component.props?.label ?? ''}
              onChange={(e) => handlePropChange('label', e.target.value)}
            />
          </div>,
          <div key="placeholder" className="property-group">
            <label>Placeholder</label>
            <input
              type="text"
              value={component.props?.placeholder ?? ''}
              onChange={(e) => handlePropChange('placeholder', e.target.value)}
            />
          </div>,
          <div key="options" className="property-group">
            <label>Options (one per line)</label>
            <textarea
              value={(component.props.options || []).join('\n')}
              onChange={(e) => {
                const options = e.target.value.split('\n').filter(o => o.trim())
                handlePropChange('options', options)
              }}
              rows={4}
              placeholder="Option 1&#10;Option 2&#10;Option 3"
            />
          </div>,
          <div key="color" className="property-group">
            <label>Text Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.color || '#000000'}
                onChange={(e) => handlePropChange('color', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.color || '#000000'}
                onChange={(e) => handlePropChange('color', e.target.value)}
                className="color-input"
                placeholder="#000000"
              />
            </div>
          </div>,
          <div key="backgroundColor" className="property-group">
            <label>Background Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="color-input"
                placeholder="#ffffff"
              />
            </div>
          </div>
        )
        break

      case 'ImageCarousel':
        inputs.push(
          <div key="images" className="property-group">
            <label>Image URLs (one per line)</label>
            <textarea
              value={(component.props.images || []).join('\n')}
              onChange={(e) => {
                const images = e.target.value.split('\n').filter(i => i.trim())
                handlePropChange('images', images)
              }}
              rows={6}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            />
          </div>,
          <div key="autoplay" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props?.autoplay ?? true}
                onChange={(e) => handlePropChange('autoplay', e.target.checked)}
              />
              {' '}Autoplay
            </label>
          </div>,
          <div key="interval" className="property-group">
            <label>Interval (ms)</label>
            <input
              type="number"
              value={component.props.interval ?? 3000}
              onChange={(e) => handleNumberChange('interval', e.target.value, 3000)}
              min="1000"
              step="500"
            />
          </div>,
          <div key="height" className="property-group">
            <label>Height (px)</label>
            <input
              type="number"
              value={component.props.height ?? 400}
              onChange={(e) => handleNumberChange('height', e.target.value, 400)}
              min="100"
            />
          </div>
        )
        break

      case 'Navigation':
        inputs.push(
          <div key="style" className="property-group">
            <label>Style</label>
            <select
              value={component.props.style || 'horizontal'}
              onChange={(e) => handlePropChange('style', e.target.value)}
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>,
          <div key="links" className="property-group">
            <label>Links (Format: Label|Path, one per line)</label>
            <textarea
              value={(component.props.links || []).map(l => `${l.label || ''}|${l.path || ''}`).join('\n')}
              onChange={(e) => {
                const links = e.target.value.split('\n')
                  .filter(l => l.trim())
                  .map(l => {
                    const [label, path] = l.split('|')
                    return { label: label?.trim() || '', path: path?.trim() || '/' }
                  })
                handlePropChange('links', links)
              }}
              rows={6}
              placeholder="Home|/&#10;About|/about&#10;Contact|/contact"
            />
          </div>,
          <div key="backgroundColor" className="property-group">
            <label>Background Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                className="color-input"
                placeholder="#ffffff"
              />
            </div>
          </div>,
          <div key="textColor" className="property-group">
            <label>Text Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.textColor || '#000000'}
                onChange={(e) => handlePropChange('textColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.textColor || '#000000'}
                onChange={(e) => handlePropChange('textColor', e.target.value)}
                className="color-input"
                placeholder="#000000"
              />
            </div>
          </div>,
          <div key="activeColor" className="property-group">
            <label>Active/Hover Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={component.props.activeColor || '#007bff'}
                onChange={(e) => handlePropChange('activeColor', e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={component.props.activeColor || '#007bff'}
                onChange={(e) => handlePropChange('activeColor', e.target.value)}
                className="color-input"
                placeholder="#007bff"
              />
            </div>
          </div>
        )
        break

      case 'Alert':
        inputs.push(
          <div key="variant" className="property-group">
            <label>Variant</label>
            <select
              value={component.props?.variant ?? 'primary'}
              onChange={(e) => handlePropChange('variant', e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>,
          <div key="message" className="property-group">
            <label>Message</label>
            <textarea
              value={component.props?.message ?? ''}
              onChange={(e) => handlePropChange('message', e.target.value)}
              rows={3}
            />
          </div>,
          <div key="dismissible" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.dismissible || false}
                onChange={(e) => handlePropChange('dismissible', e.target.checked)}
              />
              {' '}Dismissible
            </label>
          </div>
        )
        break

      case 'Badge':
        inputs.push(
          <div key="text" className="property-group">
            <label>Text</label>
            <input
              type="text"
              value={component.props?.text ?? ''}
              onChange={(e) => handlePropChange('text', e.target.value)}
            />
          </div>,
          <div key="variant" className="property-group">
            <label>Variant</label>
            <select
              value={component.props?.variant ?? 'primary'}
              onChange={(e) => handlePropChange('variant', e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>,
          <div key="pill" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.pill || false}
                onChange={(e) => handlePropChange('pill', e.target.checked)}
              />
              {' '}Pill Style
            </label>
          </div>,
          <div key="size" className="property-group">
            <label>Size</label>
            <select
              value={component.props?.size ?? 'medium'}
              onChange={(e) => handlePropChange('size', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        )
        break

      case 'Card':
        inputs.push(
          <div key="title" className="property-group">
            <label>Title</label>
            <input
              type="text"
              value={component.props?.title ?? ''}
              onChange={(e) => handlePropChange('title', e.target.value)}
            />
          </div>,
          <div key="subtitle" className="property-group">
            <label>Subtitle</label>
            <input
              type="text"
              value={component.props?.subtitle ?? ''}
              onChange={(e) => handlePropChange('subtitle', e.target.value)}
            />
          </div>,
          <div key="text" className="property-group">
            <label>Text</label>
            <textarea
              value={component.props?.text ?? ''}
              onChange={(e) => handlePropChange('text', e.target.value)}
              rows={4}
            />
          </div>,
          <div key="image" className="property-group">
            <label>Image URL</label>
            <input
              type="text"
              value={component.props?.image ?? ''}
              onChange={(e) => handlePropChange('image', e.target.value)}
            />
          </div>,
          <div key="buttonText" className="property-group">
            <label>Button Text</label>
            <input
              type="text"
              value={component.props?.buttonText ?? ''}
              onChange={(e) => handlePropChange('buttonText', e.target.value)}
            />
          </div>,
          <div key="buttonVariant" className="property-group">
            <label>Button Variant</label>
            <select
              value={component.props.buttonVariant || 'primary'}
              onChange={(e) => handlePropChange('buttonVariant', e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
            </select>
          </div>
        )
        break

      case 'Table':
        inputs.push(
          <div key="headers" className="property-group">
            <label>Headers (comma separated)</label>
            <input
              type="text"
              value={(component.props.headers || []).join(', ')}
              onChange={(e) => {
                const headers = e.target.value.split(',').map(h => h.trim()).filter(h => h)
                handlePropChange('headers', headers)
              }}
            />
          </div>,
          <div key="rows" className="property-group">
            <label>Rows (one per line, comma separated)</label>
            <textarea
              value={(component.props.rows || []).map(row => row.join(', ')).join('\n')}
              onChange={(e) => {
                const rows = e.target.value.split('\n')
                  .filter(r => r.trim())
                  .map(r => r.split(',').map(c => c.trim()).filter(c => c))
                handlePropChange('rows', rows)
              }}
              rows={6}
            />
          </div>,
          <div key="striped" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.striped || false}
                onChange={(e) => handlePropChange('striped', e.target.checked)}
              />
              {' '}Striped
            </label>
          </div>,
          <div key="bordered" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.bordered || false}
                onChange={(e) => handlePropChange('bordered', e.target.checked)}
              />
              {' '}Bordered
            </label>
          </div>,
          <div key="hover" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.hover || false}
                onChange={(e) => handlePropChange('hover', e.target.checked)}
              />
              {' '}Hover Effect
            </label>
          </div>,
          <div key="dark" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.dark || false}
                onChange={(e) => handlePropChange('dark', e.target.checked)}
              />
              {' '}Dark Theme
            </label>
          </div>
        )
        break

      case 'Checkbox':
        inputs.push(
          <div key="label" className="property-group">
            <label>Label</label>
            <input
              type="text"
              value={component.props?.label ?? ''}
              onChange={(e) => handlePropChange('label', e.target.value)}
            />
          </div>,
          <div key="checked" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.checked || false}
                onChange={(e) => handlePropChange('checked', e.target.checked)}
              />
              {' '}Checked
            </label>
          </div>,
          <div key="disabled" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.disabled || false}
                onChange={(e) => handlePropChange('disabled', e.target.checked)}
              />
              {' '}Disabled
            </label>
          </div>,
          <div key="inline" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.inline || false}
                onChange={(e) => handlePropChange('inline', e.target.checked)}
              />
              {' '}Inline
            </label>
          </div>
        )
        break

      case 'Radio':
        inputs.push(
          <div key="label" className="property-group">
            <label>Label</label>
            <input
              type="text"
              value={component.props?.label ?? ''}
              onChange={(e) => handlePropChange('label', e.target.value)}
            />
          </div>,
          <div key="name" className="property-group">
            <label>Group Name</label>
            <input
              type="text"
              value={component.props.name || ''}
              onChange={(e) => handlePropChange('name', e.target.value)}
            />
          </div>,
          <div key="checked" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.checked || false}
                onChange={(e) => handlePropChange('checked', e.target.checked)}
              />
              {' '}Checked
            </label>
          </div>,
          <div key="disabled" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.disabled || false}
                onChange={(e) => handlePropChange('disabled', e.target.checked)}
              />
              {' '}Disabled
            </label>
          </div>
        )
        break

      case 'Select':
        inputs.push(
          <div key="label" className="property-group">
            <label>Label</label>
            <input
              type="text"
              value={component.props?.label ?? ''}
              onChange={(e) => handlePropChange('label', e.target.value)}
            />
          </div>,
          <div key="options" className="property-group">
            <label>Options (one per line)</label>
            <textarea
              value={(component.props.options || []).join('\n')}
              onChange={(e) => {
                const options = e.target.value.split('\n').filter(o => o.trim())
                handlePropChange('options', options)
              }}
              rows={4}
            />
          </div>,
          <div key="placeholder" className="property-group">
            <label>Placeholder</label>
            <input
              type="text"
              value={component.props?.placeholder ?? ''}
              onChange={(e) => handlePropChange('placeholder', e.target.value)}
            />
          </div>,
          <div key="multiple" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.multiple || false}
                onChange={(e) => handlePropChange('multiple', e.target.checked)}
              />
              {' '}Multiple Selection
            </label>
          </div>,
          <div key="size" className="property-group">
            <label>Size</label>
            <select
              value={component.props?.size ?? 'medium'}
              onChange={(e) => handlePropChange('size', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        )
        break

      case 'Textarea':
        inputs.push(
          <div key="label" className="property-group">
            <label>Label</label>
            <input
              type="text"
              value={component.props?.label ?? ''}
              onChange={(e) => handlePropChange('label', e.target.value)}
            />
          </div>,
          <div key="placeholder" className="property-group">
            <label>Placeholder</label>
            <input
              type="text"
              value={component.props?.placeholder ?? ''}
              onChange={(e) => handlePropChange('placeholder', e.target.value)}
            />
          </div>,
          <div key="rows" className="property-group">
            <label>Rows</label>
            <input
              type="number"
              value={component.props.rows ?? 4}
              onChange={(e) => handleNumberChange('rows', e.target.value, 4)}
              min="1"
            />
          </div>,
          <div key="disabled" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.disabled || false}
                onChange={(e) => handlePropChange('disabled', e.target.checked)}
              />
              {' '}Disabled
            </label>
          </div>,
          <div key="readonly" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.readonly || false}
                onChange={(e) => handlePropChange('readonly', e.target.checked)}
              />
              {' '}Read Only
            </label>
          </div>
        )
        break

      case 'Progress':
        inputs.push(
          <div key="value" className="property-group">
            <label>Value</label>
            <input
              type="number"
              value={component.props.value ?? 50}
              onChange={(e) => handleNumberChange('value', e.target.value, 50)}
              min="0"
            />
          </div>,
          <div key="max" className="property-group">
            <label>Max</label>
            <input
              type="number"
              value={component.props.max ?? 100}
              onChange={(e) => handleNumberChange('max', e.target.value, 100)}
              min="1"
            />
          </div>,
          <div key="variant" className="property-group">
            <label>Variant</label>
            <select
              value={component.props?.variant ?? 'primary'}
              onChange={(e) => handlePropChange('variant', e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>,
          <div key="striped" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.striped || false}
                onChange={(e) => handlePropChange('striped', e.target.checked)}
              />
              {' '}Striped
            </label>
          </div>,
          <div key="animated" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.animated || false}
                onChange={(e) => handlePropChange('animated', e.target.checked)}
              />
              {' '}Animated
            </label>
          </div>,
          <div key="label" className="property-group">
            <label>Custom Label (leave empty for percentage)</label>
            <input
              type="text"
              value={component.props?.label ?? ''}
              onChange={(e) => handlePropChange('label', e.target.value)}
            />
          </div>
        )
        break

      case 'Spinner':
        inputs.push(
          <div key="variant" className="property-group">
            <label>Variant</label>
            <select
              value={component.props?.variant ?? 'primary'}
              onChange={(e) => handlePropChange('variant', e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>,
          <div key="size" className="property-group">
            <label>Size</label>
            <select
              value={component.props?.size ?? 'medium'}
              onChange={(e) => handlePropChange('size', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>,
          <div key="type" className="property-group">
            <label>Type</label>
            <select
              value={component.props.type || 'border'}
              onChange={(e) => handlePropChange('type', e.target.value)}
            >
              <option value="border">Border</option>
              <option value="grow">Grow</option>
            </select>
          </div>,
          <div key="text" className="property-group">
            <label>Text (optional)</label>
            <input
              type="text"
              value={component.props?.text ?? ''}
              onChange={(e) => handlePropChange('text', e.target.value)}
            />
          </div>
        )
        break

      case 'Accordion':
        inputs.push(
          <div key="items" className="property-group">
            <label>Items (Format: Title|Content, one per line)</label>
            <textarea
              value={(component.props.items || []).map(item => `${item.title || ''}|${item.content || ''}`).join('\n')}
              onChange={(e) => {
                const items = e.target.value.split('\n')
                  .filter(i => i.trim())
                  .map(i => {
                    const [title, ...contentParts] = i.split('|')
                    return { title: title?.trim() || '', content: contentParts.join('|').trim() || '' }
                  })
                handlePropChange('items', items)
              }}
              rows={6}
            />
          </div>,
          <div key="flush" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.flush || false}
                onChange={(e) => handlePropChange('flush', e.target.checked)}
              />
              {' '}Flush Style
            </label>
          </div>,
          <div key="alwaysOpen" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.alwaysOpen || false}
                onChange={(e) => handlePropChange('alwaysOpen', e.target.checked)}
              />
              {' '}Always Open (multiple items)
            </label>
          </div>
        )
        break

      case 'ListGroup':
        inputs.push(
          <div key="items" className="property-group">
            <label>Items (one per line)</label>
            <textarea
              value={(component.props.items || []).join('\n')}
              onChange={(e) => {
                const items = e.target.value.split('\n').filter(i => i.trim())
                handlePropChange('items', items)
              }}
              rows={6}
            />
          </div>,
          <div key="flush" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.flush || false}
                onChange={(e) => handlePropChange('flush', e.target.checked)}
              />
              {' '}Flush Style
            </label>
          </div>,
          <div key="numbered" className="property-group">
            <label>
              <input
                type="checkbox"
                checked={component.props.numbered || false}
                onChange={(e) => handlePropChange('numbered', e.target.checked)}
              />
              {' '}Numbered List
            </label>
          </div>
        )
        break

      case 'Modal':
        inputs.push(
          <div key="title" className="property-group">
            <label>Title</label>
            <input
              type="text"
              value={component.props?.title ?? ''}
              onChange={(e) => handlePropChange('title', e.target.value)}
            />
          </div>,
          <div key="body" className="property-group">
            <label>Body Text</label>
            <textarea
              value={component.props?.body ?? ''}
              onChange={(e) => handlePropChange('body', e.target.value)}
              rows={4}
            />
          </div>,
          <div key="buttonText" className="property-group">
            <label>Button Text</label>
            <input
              type="text"
              value={component.props?.buttonText ?? ''}
              onChange={(e) => handlePropChange('buttonText', e.target.value)}
            />
          </div>,
          <div key="buttonVariant" className="property-group">
            <label>Button Variant</label>
            <select
              value={component.props.buttonVariant || 'primary'}
              onChange={(e) => handlePropChange('buttonVariant', e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
            </select>
          </div>,
          <div key="size" className="property-group">
            <label>Size</label>
            <select
              value={component.props?.size ?? 'medium'}
              onChange={(e) => handlePropChange('size', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        )
        break

      case 'Navbar':
        inputs.push(
          <div key="brand" className="property-group">
            <label>Brand</label>
            <input
              type="text"
              value={component.props?.brand ?? ''}
              onChange={(e) => handlePropChange('brand', e.target.value)}
            />
          </div>,
          <div key="links" className="property-group">
            <label>Links (Format: Label|Path, one per line)</label>
            <textarea
              value={(component.props.links || []).map(l => `${l.label || ''}|${l.path || ''}`).join('\n')}
              onChange={(e) => {
                const links = e.target.value.split('\n')
                  .filter(l => l.trim())
                  .map(l => {
                    const [label, path] = l.split('|')
                    return { label: label?.trim() || '', path: path?.trim() || '/' }
                  })
                handlePropChange('links', links)
              }}
              rows={6}
            />
          </div>,
          <div key="variant" className="property-group">
            <label>Variant</label>
            <select
              value={component.props.variant || 'light'}
              onChange={(e) => handlePropChange('variant', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>,
          <div key="expand" className="property-group">
            <label>Expand Breakpoint</label>
            <select
              value={component.props.expand || 'md'}
              onChange={(e) => handlePropChange('expand', e.target.value)}
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>
        )
        break

      case 'Pagination':
        inputs.push(
          <div key="currentPage" className="property-group">
            <label>Current Page</label>
            <input
              type="number"
              value={component.props.currentPage ?? 1}
              onChange={(e) => handleNumberChange('currentPage', e.target.value, 1)}
              min="1"
            />
          </div>,
          <div key="totalPages" className="property-group">
            <label>Total Pages</label>
            <input
              type="number"
              value={component.props.totalPages ?? 5}
              onChange={(e) => handleNumberChange('totalPages', e.target.value, 5)}
              min="1"
            />
          </div>,
          <div key="size" className="property-group">
            <label>Size</label>
            <select
              value={component.props?.size ?? 'medium'}
              onChange={(e) => handlePropChange('size', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>,
          <div key="alignment" className="property-group">
            <label>Alignment</label>
            <select
              value={component.props.alignment || 'start'}
              onChange={(e) => handlePropChange('alignment', e.target.value)}
            >
              <option value="start">Start</option>
              <option value="center">Center</option>
              <option value="end">End</option>
            </select>
          </div>
        )
        break

      default:
        break
    }

    return inputs
  }

  return (
    <div className="property-panel">
      <h3 className="panel-title">Properties</h3>
      <div className="panel-content">
        <div className="property-group">
          <label>Component Type</label>
          <input type="text" value={component.type} disabled />
        </div>
        {renderPropertyInputs()}
      </div>
    </div>
  )
}

export default PropertyPanel

