// ---- State Management (using variables, though not React state here) ----
// Using regular JS variables to store audio objects (not React state, so no re-render)
let startAudio = null;
let duringAudio = null;
let endAudio = null;

// ---- Creating a Function Component Equivalent (here, utility functions) ----
// Although not a React component, these are modular, reusable functions (modular code concept)

// ---- Event Management (functions triggered by events like button clicks in UI) ----
export const playStartSound = () => {
  stopAllSounds(); // ---- Creating an Event–Aware Component (responding to event by stopping sounds first) ----
  startAudio = new Audio('/sounds/start-task.mp3'); // ---- Using browser API (not React specific) ----
  startAudio.volume = 1;
  startAudio.play().catch(err => console.error("Start sound error:", err)); // ---- Event handling for promise rejections ----
};

export const playDuringSound = () => {
  stopAllSounds();
  duringAudio = new Audio('/sounds/during-task.mp3');
  duringAudio.loop = true; // ---- Properties (props) equivalent for audio object ----
  duringAudio.volume = 1;
  duringAudio.play().catch(err => console.error("During sound error:", err));
};

export const playEndSound = () => {
  stopAllSounds();
  endAudio = new Audio('/sounds/end-task.mp3');
  endAudio.volume = 1;
  endAudio.play().catch(err => console.error("End sound error:", err));
};

// ---- Creating Utility Functions for Reusability ----
export const stopAllSounds = () => {
  // ---- Lists & Iteration (looping over an array of audio objects) ----
  [startAudio, duringAudio, endAudio].forEach(audio => {
    // ---- Conditional Rendering logic equivalent (check if audio exists and is playing) ----
    if (audio && !audio.paused) {
      audio.pause(); // ---- Event Management ----
      audio.currentTime = 0;
    }
  });
};
