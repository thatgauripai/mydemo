let startAudio = null;
let duringAudio = null;
let endAudio = null;

export const playStartSound = () => {
  stopAllSounds();
  startAudio = new Audio('/sounds/start-task.mp3');
  startAudio.volume = 1;
  startAudio.play().catch(err => console.error("Start sound error:", err));
};

export const playDuringSound = () => {
  stopAllSounds();
  duringAudio = new Audio('/sounds/during-task.mp3');
  duringAudio.loop = true;
  duringAudio.volume = 1;
  duringAudio.play().catch(err => console.error("During sound error:", err));
};

export const playEndSound = () => {
  stopAllSounds();
  endAudio = new Audio('/sounds/end-task.mp3');
  endAudio.volume = 1;
  endAudio.play().catch(err => console.error("End sound error:", err));
};

export const stopAllSounds = () => {
  [startAudio, duringAudio, endAudio].forEach(audio => {
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
};
