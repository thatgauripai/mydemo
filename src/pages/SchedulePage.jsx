import React, { useState, useEffect } from 'react' // Components, State Management using React Hooks, Component Life Cycle using React Hooks
import { useNavigate } from 'react-router-dom' // Routing
import { scheduleData, getCurrentTime, getCurrentDate } from '../data/schedule'
import '../styles/SchedulePage.css' // Styling

// Component for the schedule page
// Components - functional component definition
// Layout Component - acts as a layout for different schedule sections
const SchedulePage = () => {
  // State Management using React Hooks - useState to track current time
  const [currentTime, setCurrentTime] = useState(getCurrentTime())
  // State Management using React Hooks - useState to track completed task IDs
  const [completedTaskIds, setCompletedTaskIds] = useState([])
  
  const navigate = useNavigate() // Routing - programmatic navigation

  // Component Life Cycle using React Hooks - useEffect for setting up interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime())
    }, 1000)

    return () => clearInterval(timer) // Cleanup on unmount
  }, [])

  // Component Life Cycle using React Hooks - useEffect to load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('completedTaskIds')
    if (stored) {
      setCompletedTaskIds(JSON.parse(stored))
    }
  }, [])

  // Component Life Cycle using React Hooks - useEffect to save data to localStorage
  useEffect(() => {
    localStorage.setItem('completedTaskIds', JSON.stringify(completedTaskIds))
  }, [completedTaskIds])

  // Event management - handling click event for marking tasks as complete
  const handleCompleteTask = (taskId) => {
    if (!completedTaskIds.includes(taskId)) {
      setCompletedTaskIds([...completedTaskIds, taskId])
    }
  }

  // Event management - handling click event for navigating to timer page
  const handleTaskClick = (taskId) => {
    navigate(`/timer/${taskId}`)
  }

  // Lists - totalTasks calculated from array length
  const totalTasks = scheduleData.length
  const completedTasks = completedTaskIds.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  // Lists - find method to determine the next task
  const upNextTask = scheduleData.find(task => task.isUpNext) || scheduleData[0]
  
  // Component Life Cycle using React Hooks - useEffect for triggering notifications
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Time for your next task!", {
        body: upNextTask.title
      })
    }
  }, [upNextTask])

  // Nested Components - multiple UI sections within the component
  return (
    <div className="schedule-page"> {/* Styling - className for CSS */}
      <div className="container">
        {/* Header Section */}
        <header className="schedule-header">
          <div className="header-content">
            <div className="header-left">
              <h1>My Daily Schedule</h1>
              <div className="date">
                📅 {getCurrentDate()} {/* Properties - calling function to get current date */}
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
              style={{ width: `${progressPercentage}%` }} // Styling - inline style
            ></div>
          </div>
          <div className="progress-message">
            Keep going! You're doing great!
            <span style={{ float: 'right' }}>{Math.round(progressPercentage)}%</span>
          </div>
        </section>

        {/* Conditional Rendering - only displays if upNextTask exists */}
        <section className="up-next-section">
          <div className="up-next-header">
            <span className="up-next-arrow">➤</span>
            <span>Up Next</span>
          </div>
          <div 
            className="up-next-card"
            onClick={() => handleTaskClick(upNextTask.id)} // Event handling
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
                {/* Conditional Rendering - button text changes based on completion */}
                <button
                  className="complete-btn"
                  disabled={completedTaskIds.includes(upNextTask.id)}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCompleteTask(upNextTask.id) // Event handling
                  }}
                >
                  {completedTaskIds.includes(upNextTask.id) ? 'Completed' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Lists and Keys - mapping over scheduleData to create list of tasks */}
        <section className="task-grid">
          {scheduleData.map((task) => (
            <div 
              key={task.id} // Keys - unique key for list item
              className={`task-card${completedTaskIds.includes(task.id) ? ' completed' : ''}`}
              onClick={() => handleTaskClick(task.id)} // Event handling
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
                  {/* Conditional Rendering - button text changes based on completion */}
                  <button 
                    className="complete-btn"
                    disabled={completedTaskIds.includes(task.id)}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCompleteTask(task.id) // Event handling
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
  )
}

export default SchedulePage // Using Newly Created Components
