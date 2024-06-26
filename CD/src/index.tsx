import "./global.css";
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)