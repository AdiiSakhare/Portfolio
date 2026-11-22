import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/tokens.css'
import './styles/base.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BASE_URL is '/Portfolio/' on GitHub Pages and '/' in dev; the router wants it without the trailing slash. */}
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
