import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./global.css";

(function darkMode() {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)