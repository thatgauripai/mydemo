import React from 'react'; 
// ---- Components ---- (React functional component creation)
// ---- Creating Components using Properties ---- (React components can accept props, though not used here)

import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
// ---- Routing ---- (Using React Router for navigation between pages)

import Navbar from './Navbar'; 
// ---- Using Newly Created Components ---- (Navbar is a custom component created in another file)
// ---- Component Collection ---- (App imports multiple components to combine them)

import UseCasePage from './UseCasePage'; 
// ---- Using Newly Created Components ----

import './App.css'; 
// ---- Styling ---- (External CSS file for component styling)

// ---- Components ----
// Home is a **stateless component** since it has no state and only returns JSX
function Home() {
  return (
    <div className="App-header">
      {/* ---- Styling ---- (CSS class applied for styling) */}
      <h1>Welcome to the Home Page!</h1>
      <p>This is where your main application content goes.</p>
    </div>
  );
}

// ---- Components ----
// App is also a **stateless component** here because it manages no state directly
function App() {
  return (
    // ---- Routing ---- (BrowserRouter wraps the application for routing support)
    <BrowserRouter>
      <div>
        {/* ---- Using Newly Created Components ---- */}
        <Navbar />
        
        {/* ---- Routing ---- (Routes defines available paths, Route maps path to component) */}
        <Routes>
          {/* ---- Conditional Rendering (via Routing) ---- Only renders Home when path is "/" */}
          <Route path="/" element={<Home />} />
          {/* ---- Conditional Rendering (via Routing) ---- Only renders UseCasePage when path is "/usecase" */}
          <Route path="/usecase" element={<UseCasePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; 
// ---- Component Export ---- (Makes App available for rendering in index.js)
