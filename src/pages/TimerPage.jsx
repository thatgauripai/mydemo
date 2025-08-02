import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { scheduleData } from '../data/schedule'
import CircularTimer from '../components/CircularTimer'
import '../styles/TimerPage.css'

const TimerPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const task = scheduleData.find(t => t.id === taskId)
  
  const [timeLeft, setTimeLeft] = useState(task ? task.duration * 60 : 0) // Convert minutes to seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  
  const totalTime = task ? task.duration * 60 : 0

  useEffect(() => {
    let interval = null
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsRunning(false)
            setIsCompleted(true)
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else if (!isRunning) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(totalTime)
    setIsCompleted(false)
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleTaskComplete = () => {
    // Here you could save the completion status
    navigate('/')
  }

  const handleNextTask = () => {
    const currentIndex = scheduleData.findIndex(t => t.id === taskId)
    const nextTask = scheduleData[currentIndex + 1]
    if (nextTask) {
      navigate(`/timer/${nextTask.id}`)
    } else {
      navigate('/')
    }
  }

  if (!task) {
    return (
      <div className="timer-page">
        <div className="timer-container">
          <h2>Task not found</h2>
          <button className="control-button" onClick={handleBack}>
            Back to Schedule
          </button>
        </div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="timer-page">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <div className="timer-container">
          <div className="success-message">
            <span className="success-icon">🎉</span>
            <h2 className="success-title">Job done.</h2>
            <p className="success-subtitle">Great work!</p>
            <div className="completion-buttons">
              <button className="completion-button" onClick={handleTaskComplete}>
                Mark Complete
              </button>
              <button className="completion-button secondary" onClick={handleNextTask}>
                Next Task
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="timer-page">
      <button className="back-button" onClick={handleBack}>
        ← Back
      </button>
      
      <div className="timer-container">
        <div className="task-header">
          <span className="task-icon-large">{task.icon}</span>
          <h2 className="task-title">{task.title}</h2>
          <p className="task-description">{task.description}</p>
        </div>

        <CircularTimer timeLeft={timeLeft} totalTime={totalTime} />

        <div className="timer-controls">
          {!isRunning ? (
            <button className="control-button" onClick={handleStart}>
              {timeLeft === totalTime ? 'Start' : 'Resume'}
            </button>
          ) : (
            <button className="control-button" onClick={handlePause}>
              Pause
            </button>
          )}
          <button className="control-button secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimerPage