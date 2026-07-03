import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ShortcutsModalProvider } from './context/ShortcutsModalContext.jsx'
import { logClientError } from './lib/logger.js'
import * as Sentry from "@sentry/react";

window.addEventListener("error", (e) => {
  logClientError({ message: e.message, stack: e.error?.stack });
});

window.addEventListener("unhandledrejection", (e) => {
  logClientError({ message: "Unhandled promise rejection", stack: String(e.reason) });
});

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <ShortcutsModalProvider>
              <App />
            </ShortcutsModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)