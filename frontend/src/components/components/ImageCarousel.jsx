import React, { useState, useEffect } from 'react'
import './ImageCarousel.css'

function ImageCarousel({ images = [], autoplay = true, interval = 3000, height = 400 }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoplay || images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoplay, interval, images.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  if (!images || images.length === 0) {
    return (
      <div className="carousel-container" style={{ height: `${height}px` }}>
        <div className="carousel-empty">No images</div>
      </div>
    )
  }

  return (
    <div className="carousel-container" style={{ height: `${height}px` }}>
      <div className="carousel-wrapper">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <button className="carousel-button carousel-button-prev" onClick={goToPrevious}>
            ‹
          </button>
          <button className="carousel-button carousel-button-next" onClick={goToNext}>
            ›
          </button>
          
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCarousel

