import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SchedulePage from './pages/SchedulePage'
import TimerPage from './pages/TimerPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SchedulePage />} />
        <Route path="/timer/:taskId" element={<TimerPage />} />
      </Routes>
    </div>
  )
}

export default App