import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { logClientError } from './lib/logger.js'

window.addEventListener("error", (e) => {
  logClientError({ message: e.message, stack: e.error?.stack });
});

window.addEventListener("unhandledrejection", (e) => {
  logClientError({ message: "Unhandled promise rejection", stack: String(e.reason) });
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)