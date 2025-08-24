import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('🚀 TaskFlow: JavaScript loading...')

const rootElement = document.getElementById('root')
console.log('🎯 Root element:', rootElement)

if (!rootElement) {
  console.error('❌ Root element not found!')
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: monospace;">Error: Root element not found!</div>'
} else {
  try {
    console.log('✅ Creating React root...')
    const root = ReactDOM.createRoot(rootElement)
    console.log('✅ Rendering App...')
    root.render(<App />)
    console.log('🎉 React app rendered successfully!')
  } catch (error) {
    console.error('❌ Error rendering React app:', error)
    rootElement.innerHTML = `<div style="padding: 20px; color: red; font-family: monospace;">React Error: ${error.message}</div>`
  }
}