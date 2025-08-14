import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SchedulePage from './pages/SchedulePage';
import TimerPage from './pages/TimerPage';
import Navbar from './Navbar'; // Import the Navbar component
import UseCasePage from './UseCasePage.jsx';

function App() {
  return (
    <div className="App">
      {/* Place the Navbar component here, before the <Routes>. 
        It will be rendered on every page, while the content below it changes based on the URL.
      */}
      <Navbar />

      <Routes>
        
        <Route path="/" element={<SchedulePage />} />
        
        <Route path="/timer/:taskId" element={<TimerPage />} />
        <Route path="/usecase" element={<UseCasePage />} />
      </Routes>
    </div>
  );
}

export default App;