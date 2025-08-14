import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import UseCasePage from './UseCasePage';
import './App.css'; // Keep your existing App.css

// Assume your original App content is in a Home component
function Home() {
  return (
    <div className="App-header">
      <h1>Welcome to the Home Page!</h1>
      <p>This is where your main application content goes.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usecase" element={<UseCasePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;