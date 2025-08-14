// Importing React library to create components and use JSX syntax
import React from 'react'

// Importing ReactDOM for rendering React components into the DOM
import ReactDOM from 'react-dom/client'

// Importing BrowserRouter from react-router-dom to enable routing in the application
import { BrowserRouter } from 'react-router-dom'

// Importing the main App component which will contain the app's structure and routing logic
import App from './App.jsx'

// Importing global CSS styles for the app
import './styles/index.css'

// Creating a root for rendering the React application (React 18's createRoot API)
// This attaches React to the HTML element with id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode is a wrapper that helps detect potential problems in the app (dev mode only)
  <React.StrictMode>
    {/* BrowserRouter enables navigation and routing between pages/components */}
    <BrowserRouter>
      {/* Rendering the main App component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
