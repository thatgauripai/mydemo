import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { scheduleData, getCurrentTime, getCurrentDate } from '../data/schedule'
import '../styles/SchedulePage.css'

const SchedulePage = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime())
  const [completedTasks] = useState(0) // Start with 0 completed tasks
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleTaskClick = (taskId) => {
    navigate(`/timer/${taskId}`)
  }

  const totalTasks = scheduleData.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  const upNextTask = scheduleData.find(task => task.isUpNext) || scheduleData[0]
  const otherTasks = scheduleData.filter(task => !task.isUpNext)

  return (
    <div className="schedule-page">
      <div className="container">
        {/* Header Section */}
        <header className="schedule-header">
          <div className="header-content">
            <div className="header-left">
              <h1>My Daily Schedule</h1>
              <div className="date">
                📅 {getCurrentDate()}
              </div>
            </div>
            <div className="header-right">
              <div className="current-time">{currentTime}</div>
              <div className="time-label">Current time</div>
            </div>
          </div>
        </header>

        {/* Progress Section */}
        <section className="progress-section">
          <div className="progress-header">
            <h2 className="progress-title">Today's Progress</h2>
            <div className="progress-stats">
              <span className="trophy-icon">🏆</span>
              <span>{completedTasks} of {totalTasks} completed</span>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-message">
            Keep going! You're doing great!
            <span style={{ float: 'right' }}>{Math.round(progressPercentage)}%</span>
          </div>
        </section>

        {/* Up Next Section */}
        <section className="up-next-section">
          <div className="up-next-header">
            <span className="up-next-arrow">➤</span>
            <span>Up Next</span>
          </div>
          <div 
            className="up-next-card"
            onClick={() => handleTaskClick(upNextTask.id)}
          >
            <div className="up-next-content">
              <div className="up-next-icon">{upNextTask.icon}</div>
              <div className="up-next-details">
                <h3>{upNextTask.title}</h3>
                <p>{upNextTask.description}</p>
                <div className="up-next-time">
                  <div className="time-info">
                    <span>🕐</span>
                    <span>{upNextTask.time}</span>
                  </div>
                  <span>•</span>
                  <div className="time-info">
                    <span>{upNextTask.duration} minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Task Grid */}
        <section className="task-grid">
          {otherTasks.map((task) => (
            <div 
              key={task.id} 
              className="task-card"
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="task-content">
                <div className="task-icon">{task.icon}</div>
                <div className="task-details">
                  <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-time">{task.time}</div>
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div className="task-duration">Duration: {task.duration} minutes</div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default SchedulePage