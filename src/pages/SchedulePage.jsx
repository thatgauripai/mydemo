import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { scheduleData, getCurrentTime, getCurrentDate } from '../data/schedule'
import '../styles/SchedulePage.css'

//component for the schedule page
// This component displays the daily schedule, including a progress bar, up next task, and a grid of all tasks.
const SchedulePage = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime())
  const [completedTaskIds, setCompletedTaskIds] = useState([]) // Track completed tasks
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Load completed task IDs from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('completedTaskIds')
    if (stored) {
      setCompletedTaskIds(JSON.parse(stored))
    }
  }, [])

  // Save to localStorage whenever completedTaskIds changes
  useEffect(() => {
    localStorage.setItem('completedTaskIds', JSON.stringify(completedTaskIds))
  }, [completedTaskIds])

  // Mark a task as completed
  const handleCompleteTask = (taskId) => {
  if (!completedTaskIds.includes(taskId)) {
    setCompletedTaskIds([...completedTaskIds, taskId])
  }
}


  const handleTaskClick = (taskId) => {
    navigate(`/timer/${taskId}`)
    // Simulate completion for demo purposes:
    // handleCompleteTask(taskId)
  }

  const totalTasks = scheduleData.length
  const completedTasks = completedTaskIds.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  const upNextTask = scheduleData.find(task => task.isUpNext) || scheduleData[0]
  useEffect(() => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Time for your next task!", {
      body: upNextTask.title
    })
  }
}, [upNextTask])

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
        {/* Add Mark as Completed button for Up Next */}
        <button
          className="complete-btn"
          disabled={completedTaskIds.includes(upNextTask.id)}
          onClick={(e) => {
            e.stopPropagation()
            handleCompleteTask(upNextTask.id)
          }}
        >
          {completedTaskIds.includes(upNextTask.id) ? 'Completed' : 'Mark as Completed'}
        </button>
      </div>
    </div>
  </div>
</section>


        {/* Task Grid (includes all tasks) */}
        <section className="task-grid">
          {scheduleData.map((task) => (
            <div 
              key={task.id} 
              className={`task-card${completedTaskIds.includes(task.id) ? ' completed' : ''}`}
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
                  {/* Mark as Completed button for every task */}
                  <button 
                    className="complete-btn"
                    disabled={completedTaskIds.includes(task.id)}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCompleteTask(task.id)
                    }}
                  >
                    {completedTaskIds.includes(task.id) ? 'Completed' : 'Mark as Completed'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )}

  export default SchedulePage
