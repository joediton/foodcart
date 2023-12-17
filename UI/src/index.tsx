import "./global.css";
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById("root")!);

if (import.meta.env.MODE === "development") {
  import("./browser")
    .then(({ worker }) => {
      worker.start();
    })
    .then(() => {
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    });
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}