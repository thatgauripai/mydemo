import React from 'react'

const CircularTimer = ({ timeLeft, totalTime }) => {
  const radius = 110
  const circumference = 2 * Math.PI * radius
  const progress = timeLeft / totalTime
  const strokeDasharray = circumference
  const strokeDashoffset = circumference * (1 - progress)

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="circular-timer">
      <div className="timer-circle">
        <svg>
          <circle
            className="timer-track"
            cx="50%"
            cy="50%"
            r={radius}
          />
          <circle
            className="timer-progress"
            cx="50%"
            cy="50%"
            r={radius}
            style={{
              strokeDasharray,
              strokeDashoffset
            }}
          />
        </svg>
      </div>
      <div className="timer-display">
        <div className="time-remaining">{formatTime(timeLeft)}</div>
        <div className="time-label">remaining</div>
      </div>
    </div>
  )
}

export default CircularTimer