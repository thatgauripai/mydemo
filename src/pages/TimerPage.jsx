import React, { useState, useEffect } from 'react'; // Components, State Management, State Management Using React Hooks, Component Life Cycle Using React Hooks
import { useParams, useNavigate } from 'react-router-dom'; // Routing
import { scheduleData } from '../data/schedule'; // Component Collection (importing shared data)
import CircularTimer from '../components/CircularTimer'; // Using Newly Created Components
import {
  playStartSound,
  playDuringSound,
  playEndSound,
  stopAllSounds
} from '../utils/sound'; // Component Collection (utility imports)
import '../styles/TimerPage.css'; // Styling

// Components - defining a functional component
// Layout Component - acts as a page layout for the timer view
// Routing - uses route parameters and navigation
// State Management Using React Hooks - manages UI state with useState
// Component Life Cycle Using React Hooks - uses useEffect for timer updates
// Conditional Rendering - renders different UI for active, completed, and not found states
// Event Management - user interactions (start, pause, reset, skip, navigation)
// Creating an Event–Aware Component - responds to clicks and timer events
// Controlled Component - timer display depends entirely on React state
// Lists & Keys - uses array search and mapping concepts for navigation between tasks
const TimerPage = () => {
  const { taskId } = useParams(); // Routing - reading route parameter
  const navigate = useNavigate(); // Routing - navigation hook
  const task = scheduleData.find(t => t.id === taskId); // Lists - finding the matching task

  const [timeLeft, setTimeLeft] = useState(task ? task.duration * 60 : 0); // State Management
  const [isRunning, setIsRunning] = useState(false); // State Management
  const [isCompleted, setIsCompleted] = useState(false); // State Management

  const totalTime = task ? task.duration * 60 : 0; // Properties - calculated from data

  useEffect(() => { // Component Life Cycle Using React Hooks
    let interval = null;

    if (isRunning && timeLeft > 0) { // Conditional Rendering logic
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setIsCompleted(true);
            stopAllSounds();
            playEndSound(); // Event Management - play sound on timer end
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
      if (!isRunning) {
        stopAllSounds(); // Event Management - stop sound when paused
      }
    }

    return () => clearInterval(interval); // Component Cleanup in life cycle
  }, [isRunning, timeLeft]);

  const handleStart = () => { // Event Management
    setIsRunning(true);
    playStartSound();      // Event Management
    playDuringSound();     // Event Management
  };

  const handlePause = () => { // Event Management
    setIsRunning(false);
    stopAllSounds();
  };

  const handleReset = () => { // Event Management
    setIsRunning(false);
    setTimeLeft(totalTime);
    setIsCompleted(false);
    stopAllSounds();
  };

  const handleSkip10Seconds = () => { // Event Management
    setTimeLeft(prev => Math.max(prev - 10, 0));
  };

  const handleBack = () => { // Event Management, Routing
    stopAllSounds();
    navigate('/');
  };

  const handleTaskComplete = () => { // Event Management
    playStartSound(); // Event Management

    const stored = localStorage.getItem('completedTaskIds'); // Http Client Programming (local storage operations)
    const completedIds = stored ? JSON.parse(stored) : [];

    if (!completedIds.includes(taskId)) {
      completedIds.push(taskId);
      localStorage.setItem('completedTaskIds', JSON.stringify(completedIds));
    }

    stopAllSounds();
    navigate('/');
  };

  const handleNextTask = () => { // Event Management, Lists
    const currentIndex = scheduleData.findIndex(t => t.id === taskId);
    const nextTask = scheduleData[currentIndex + 1];

    stopAllSounds();

    if (nextTask) {
      navigate(`/timer/${nextTask.id}`);
    } else {
      navigate('/');
    }
  };

  if (!task) { // Conditional Rendering
    return (
      <div className="timer-page">
        <div className="timer-container">
          <h2>Task not found</h2>
          <button className="control-button" onClick={handleBack}>
            Back to Schedule
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) { // Conditional Rendering
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
    );
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

        {/* Using Newly Created Components, Creating Components using Properties */}
        <CircularTimer timeLeft={timeLeft} totalTime={totalTime} />

        <div className="timer-controls">
          {!isRunning ? ( // Conditional Rendering
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
          <button className="control-button secondary" onClick={handleSkip10Seconds}>
            Skip 10s
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerPage; // Using Newly Created Components
