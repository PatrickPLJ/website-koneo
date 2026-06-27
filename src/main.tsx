import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import KasirApp from './kasir/KasirApp'
import './index.css'

const isKasir = window.location.pathname.startsWith('/kasir')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {isKasir ? <KasirApp /> : <App />}
  </React.StrictMode>,
)
