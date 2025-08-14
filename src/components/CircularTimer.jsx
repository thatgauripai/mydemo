import React from 'react'; // Components - importing React to create a component

// Components - defining a functional component
// Properties (props) - receiving props in the component parameters
// Creating Components using Properties - uses props to customize rendering
// Stateless Component - does not manage its own state, only uses received props
const CircularTimer = ({ timeLeft, totalTime }) => {
  const radius = 110;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  
  // Properties - using prop values to calculate progress
  const progress = timeLeft / totalTime;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - progress);

  // Component logic (helper function) - formats time without changing state
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    // Styling - outer container styled via CSS class
    <div className="circular-timer">
      {/* Nested Components - SVG used inside the React component */}
      <svg
        width={radius * 2 + strokeWidth}
        height={radius * 2 + strokeWidth}
        viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}
      >
        {/* Styling - uses external CSS via className */}
        <circle
          className="timer-track"
          cx={(radius + strokeWidth / 2)}
          cy={(radius + strokeWidth / 2)}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="timer-progress"
          cx={(radius + strokeWidth / 2)}
          cy={(radius + strokeWidth / 2)}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray} // Styling - inline SVG styling
          strokeDashoffset={strokeDashoffset} // Styling - inline SVG styling
          transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`} // Styling - rotates stroke start position
        />
      </svg>
      <div className="timer-display">
        {/* Properties - displays formatted time from prop */}
        <div className="time-remaining">{formatTime(timeLeft)}</div>
        <div className="time-label">remaining</div>
      </div>
    </div>
  );
};

// Using Newly Created Components - this component can be imported and used elsewhere
export default CircularTimer;
