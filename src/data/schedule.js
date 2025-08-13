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
  },
  {
    id: 'playtime',
    title: 'Playtime',
    description: 'Enjoy some outdoor play',
    time: '10:00 AM',
    duration: 30,
    icon: '🏃'
  },
  {
    id: 'lunch',
    title: 'Lunch',
    description: 'Have a nutritious lunch',
    time: '12:00 PM',
    duration: 30,
    icon: '🍽️'
  },
  {
    id: 'nap-time',
    title: 'Nap Time',
    description: 'Take a short nap to recharge',
    time: '1:00 PM',
    duration: 60,
    icon: '😴'
  },
  {
    id: 'afternoon-activities',
    title: 'Afternoon Activities',
    description: 'Engage in fun afternoon activities',
    time: '2:00 PM',
    duration: 90,
    icon: '🎨'
  },
  {
    id: 'dinner',
    title: 'Dinner',
    description: 'Have a delicious dinner',
    time: '7:00 PM',
    duration: 30,
    icon: '🍲'
  },
  {
    id: 'bedtime',
    title: 'Bedtime',
    description: 'Get ready for bed and sleep well',
    time: '8:30 PM',
    duration: 10,
    icon: '🛏️'
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