import React from 'react';  
// ---- Components ---- (React functional component creation)

import { Routes, Route } from 'react-router-dom';  
// ---- Routing ---- (Using React Router for defining application routes)

import SchedulePage from './pages/SchedulePage';  
// ---- Using Newly Created Components ---- (Custom component imported from another file)

import TimerPage from './pages/TimerPage';  
// ---- Using Newly Created Components ----

import Navbar from './Navbar';  
// ---- Using Newly Created Components ----

import UseCasePage from './UseCasePage.jsx';  
// ---- Using Newly Created Components ----

function App() {  
  // ---- Stateless Component ---- (No state is managed here, purely returns JSX)
  return (
    <div className="App">  
      {/* ---- Styling ---- (CSS class applied for styling) */}

      {/* ---- Using Newly Created Components ---- 
          Navbar is placed outside <Routes> so it appears on all pages 
          ---- Component Composition ---- (Combining multiple components into one layout) */}
      <Navbar />

      {/* ---- Routing ---- (Routes container holds all page routes) */}
      <Routes>
        
        {/* ---- Routing ---- 
            path="/" maps to SchedulePage 
            ---- Conditional Rendering (via Routing) ---- (SchedulePage shown only at "/") */}
        <Route path="/" element={<SchedulePage />} />
        
        {/* ---- Routing ---- 
            path="/timer/:taskId" maps to TimerPage 
            ---- URL Parameters ---- (":taskId" captures dynamic route parameters) */}
        <Route path="/timer/:taskId" element={<TimerPage />} />

        {/* ---- Routing ---- 
            path="/usecase" maps to UseCasePage */}
        <Route path="/usecase" element={<UseCasePage />} />
      </Routes>
    </div>
  );
}

export default App;  
// ---- Component Export ---- (Makes App available to be rendered in index.js)
