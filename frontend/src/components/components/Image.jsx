import React from 'react'
import './Image.css'

function Image({ src = 'https://via.placeholder.com/300x200', alt = 'Image' }) {
  return (
    <img src={src} alt={alt} className="image-component" />
  )
}

export default Image

