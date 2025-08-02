export const scheduleData = [
  {
    id: 'brush-teeth',
    title: 'Brush Teeth',
    description: 'Brush your teeth for 2 minutes',
    time: '7:00 AM',
    duration: 2, // in minutes
    icon: '🪥',
    isUpNext: true
  },
  {
    id: 'get-dressed',
    title: 'Get Dressed',
    description: 'Put on your clothes for the day',
    time: '7:05 AM',
    duration: 10,
    icon: '👕'
  },
  {
    id: 'breakfast',
    title: 'Breakfast',
    description: 'Eat a healthy breakfast',
    time: '7:30 AM',
    duration: 20,
    icon: '☕'
  },
  {
    id: 'learning-time',
    title: 'Learning Time',
    description: 'Practice reading, writing, or math',
    time: '8:00 AM',
    duration: 45,
    icon: '🎓'
  },
  {
    id: 'snack-break',
    title: 'Snack Break',
    description: 'Have a healthy snack',
    time: '9:00 AM',
    duration: 15,
    icon: '🍎'
  },
  {
    id: 'reading-time',
    title: 'Reading Time',
    description: 'Read your favorite book',
    time: '9:30 AM',
    duration: 30,
    icon: '📚'
  }
]

export const getCurrentTime = () => {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
}

export const getCurrentDate = () => {
  const now = new Date()
  return now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}