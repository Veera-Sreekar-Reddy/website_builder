export function generateCode(pages) {
  // Support both old format (components array) and new format (pages array)
  if (Array.isArray(pages) && pages.length > 0 && pages[0].components) {
    // New format: pages array
    return generateMultiPageCode(pages)
  } else if (Array.isArray(pages) && pages.length > 0 && !pages[0].components) {
    // Old format: components array
    return generateSinglePageCode(pages)
  } else {
    return generateSinglePageCode([])
  }
}

function generateMultiPageCode(pages) {
  const imports = new Set()
  const routes = []
  const pageComponents = []

  pages.forEach((page, pageIndex) => {
    const pageName = `Page${pageIndex + 1}`
    const componentCode = []
    
    page.components.forEach((comp) => {
      const code = generateComponentCode(comp, pageIndex, imports)
      componentCode.push(code)
    })

    pageComponents.push(`function ${pageName}() {
  return (
    <div className="page-container">
${componentCode.map(code => `      ${code}`).join('\n')}
    </div>
  )
}`)

    const path = pageIndex === 0 ? '/' : `/${page.name.toLowerCase().replace(/\s+/g, '-')}`
    routes.push(`        <Route path="${path}" element={<${pageName} />} />`)
  })

  const importsCode = Array.from(imports)
    .map(imp => `import ${imp} from './components/${imp}'`)
    .join('\n')

  return `import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
${importsCode}

${pageComponents.join('\n\n')}

function App() {
  return (
    <BrowserRouter>
      <Routes>
${routes.join('\n')}
      </Routes>
    </BrowserRouter>
  )
}

export default App
`
}

function generateSinglePageCode(components) {
  const imports = new Set()
  const componentCode = []

  components.forEach((comp, index) => {
    const code = generateComponentCode(comp, index, imports)
    componentCode.push(code)
  })

  const importsCode = Array.from(imports)
    .map(imp => `import ${imp} from './components/${imp}'`)
    .join('\n')

  return `import React from 'react'
${importsCode}

function GeneratedWebsite() {
  return (
    <div className="website-container">
${componentCode.map(code => `      ${code}`).join('\n')}
    </div>
  )
}

export default GeneratedWebsite
`
}

function generateComponentCode(component, index, imports) {
  imports.add(component.type)

  const props = Object.entries(component.props || {})
    .filter(([key, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => {
      if (typeof value === 'string') {
        // Escape quotes in strings
        const escapedValue = value.replace(/"/g, '&quot;').replace(/\n/g, '\\n')
        return `${key}="${escapedValue}"`
      } else if (typeof value === 'number') {
        return `${key}={${value}}`
      } else if (typeof value === 'boolean') {
        return `${key}={${value}}`
      } else {
        return `${key}={${JSON.stringify(value)}}`
      }
    })
    .join(' ')

  if (component.children && component.children.length > 0) {
    const childrenCode = component.children
      .map(child => generateComponentCode(child, index, imports))
      .map(code => `        ${code}`)
      .join('\n')
    
    return `<${component.type}${props ? ' ' + props : ''}>\n${childrenCode}\n      </${component.type}>`
  }

  return `<${component.type}${props ? ' ' + props : ''} />`
}