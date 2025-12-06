import React from 'react'
import './Navbar.css'

function Navbar({ 
  brand = 'Navbar',
  links = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' }
  ],
  variant = 'light',
  expand = 'md'
}) {
  return (
    <nav className={`navbar navbar-expand-${expand} navbar-${variant}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">{brand}</a>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            {links.map((link, index) => (
              <li key={index} className="nav-item">
                <a className="nav-link" href={link.path || '#'}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

