import React from 'react'
import './Table.css'

function Table({ 
  headers = ['Header 1', 'Header 2', 'Header 3'],
  rows = [
    ['Data 1', 'Data 2', 'Data 3'],
    ['Data 4', 'Data 5', 'Data 6']
  ],
  striped = false,
  bordered = false,
  hover = false,
  dark = false
}) {
  return (
    <table className={`table ${striped ? 'table-striped' : ''} ${bordered ? 'table-bordered' : ''} ${hover ? 'table-hover' : ''} ${dark ? 'table-dark' : ''}`}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table

