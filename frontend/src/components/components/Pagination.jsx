import React from 'react'
import './Pagination.css'

function Pagination({ 
  currentPage = 1,
  totalPages = 5,
  size = 'medium',
  alignment = 'start'
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
  return (
    <nav aria-label="Page navigation" className={`pagination-wrapper pagination-${alignment}`}>
      <ul className={`pagination pagination-${size}`}>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">«</span>
          </a>
        </li>
        {pages.map(page => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <a className="page-link" href="#">
              {page}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

