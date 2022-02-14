import React from 'react'

function ErrorList({errors = {}}) {

  if (errors.length == 0) return null

  return (
    <ul className="error-messages">
      {Object.entries(errors).map(([key, messages]) => {
        return (Array.isArray(messages) ? messages : [messages]).map((message) => (
          <li color="error" key={`${key}: ${message}`}>
            {key.toUpperCase()}: {message}
          </li>
        ))
      }
      )}
    </ul>
  )
}

export default ErrorList
