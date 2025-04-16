import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// React 앱의 진입점 설정
const rootElement = document.getElementById('app')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)