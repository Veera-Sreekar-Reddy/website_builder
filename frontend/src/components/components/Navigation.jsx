import React from 'react'
import './Navigation.css'

function Navigation({ links = [], style = 'horizontal', backgroundColor = '#ffffff', textColor = '#000000', activeColor = '#007bff' }) {
  if (!links || links.length === 0) {
    return (
      <nav className={`navigation navigation-${style}`} style={{ backgroundColor }}>
        <div className="navigation-empty">No links configured</div>
      </nav>
    )
  }

  return (
    <nav className={`navigation navigation-${style}`} style={{ backgroundColor }}>
      <ul className="navigation-list">
        {links.map((link, index) => (
          <li key={index} className="navigation-item">
            <a
              href={link.path || '#'}
              className="navigation-link"
              style={{ color: textColor }}
              onMouseEnter={(e) => {
                e.target.style.color = activeColor
              }}
              onMouseLeave={(e) => {
                e.target.style.color = textColor
              }}
            >
              {link.label || `Link ${index + 1}`}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation

