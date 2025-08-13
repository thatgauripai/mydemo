import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { scheduleData } from '../data/schedule';
import CircularTimer from '../components/CircularTimer';
import {
  playStartSound,
  playDuringSound,
  playEndSound,
  stopAllSounds
} from '../utils/sound';
import '../styles/TimerPage.css';

const TimerPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = scheduleData.find(t => t.id === taskId);

  const [timeLeft, setTimeLeft] = useState(task ? task.duration * 60 : 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalTime = task ? task.duration * 60 : 0;

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setIsCompleted(true);
            stopAllSounds();
            playEndSound(); // ✅ play end sound
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
      if (!isRunning) {
        stopAllSounds(); // ✅ stop during sound on pause
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    playStartSound();      // ✅ play start sound
    playDuringSound();     // ✅ loop during sound
  };

  const handlePause = () => {
    setIsRunning(false);
    stopAllSounds();       // ✅ stop sound when paused
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
    setIsCompleted(false);
    stopAllSounds();       // ✅ stop all sounds
  };

  const handleSkip10Seconds = () => {
    setTimeLeft(prev => Math.max(prev - 10, 0));
  };

  const handleBack = () => {
    stopAllSounds();       // ✅ stop all sounds
    navigate('/');
  };

  const handleTaskComplete = () => {
    playStartSound();      // ✅ Play start sound when "Mark Complete"

    const stored = localStorage.getItem('completedTaskIds');
    const completedIds = stored ? JSON.parse(stored) : [];

    if (!completedIds.includes(taskId)) {
      completedIds.push(taskId);
      localStorage.setItem('completedTaskIds', JSON.stringify(completedIds));
    }

    stopAllSounds();       // ✅ stop all sounds before navigating
    navigate('/');
  };

  const handleNextTask = () => {
    const currentIndex = scheduleData.findIndex(t => t.id === taskId);
    const nextTask = scheduleData[currentIndex + 1];

    stopAllSounds();       // ✅ stop all sounds before navigating

    if (nextTask) {
      navigate(`/timer/${nextTask.id}`);
    } else {
      navigate('/');
    }
  };

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
    );
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
          <button className="control-button secondary" onClick={handleSkip10Seconds}>
            Skip 10s
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
