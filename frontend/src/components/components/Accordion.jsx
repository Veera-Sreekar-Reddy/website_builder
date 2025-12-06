import React, { useState } from 'react'
import './Accordion.css'

function Accordion({ 
  items = [
    { title: 'Item 1', content: 'Content for item 1' },
    { title: 'Item 2', content: 'Content for item 2' }
  ],
  flush = false,
  alwaysOpen = false
}) {
  const [openIndex, setOpenIndex] = useState(alwaysOpen ? null : 0)

  const handleToggle = (index) => {
    if (alwaysOpen) {
      setOpenIndex(openIndex === index ? null : index)
    } else {
      setOpenIndex(openIndex === index ? null : index)
    }
  }

  return (
    <div className={`accordion ${flush ? 'accordion-flush' : ''}`}>
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${openIndex === index ? '' : 'collapsed'}`}
              type="button"
              onClick={() => handleToggle(index)}
              aria-expanded={openIndex === index}
            >
              {item.title}
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
          >
            <div className="accordion-body">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion

