import React from 'react'
import './Card.css'

function Card({ 
  title = 'Card Title', 
  subtitle = '', 
  text = 'Some quick example text to build on the card title and make up the bulk of the card content.',
  image = '',
  imageAlt = 'Card image',
  buttonText = '',
  buttonVariant = 'primary',
  backgroundColor = '#ffffff',
  borderColor = '#dee2e6'
}) {
  return (
    <div className="card" style={{ backgroundColor, borderColor: `1px solid ${borderColor}` }}>
      {image && (
        <img src={image} className="card-img-top" alt={imageAlt} />
      )}
      <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        {subtitle && <h6 className="card-subtitle">{subtitle}</h6>}
        {text && <p className="card-text">{text}</p>}
        {buttonText && (
          <a href="#" className={`btn btn-${buttonVariant}`}>{buttonText}</a>
        )}
      </div>
    </div>
  )
}

export default Card

