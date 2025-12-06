import React, { useState } from 'react'
import './Modal.css'

function Modal({ 
  title = 'Modal Title',
  body = 'Modal body text goes here.',
  buttonText = 'Open Modal',
  buttonVariant = 'primary',
  size = 'medium',
  show = false
}) {
  const [isOpen, setIsOpen] = useState(show)

  return (
    <>
      <button
        type="button"
        className={`btn btn-${buttonVariant}`}
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className={`modal modal-${size}`} onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                {body}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal

