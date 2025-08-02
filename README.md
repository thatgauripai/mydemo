# Kids Daily Schedule App

A beautiful, responsive React application designed specifically for autistic children to help them manage their daily routine with visual cues and countdown timers.

## Features

### 🏠 Schedule Dashboard
- **Beautiful gradient background** matching the provided design
- **Real-time clock** showing current time
- **Progress tracking** with visual progress bar
- **"Up Next" section** highlighting the immediate next task
- **Task grid** showing all daily activities
- **Responsive design** that works on all devices

### ⏱️ Countdown Timer
- **Circular progress indicator** showing time remaining
- **Large, easy-to-read timer** with MM:SS format
- **Start/Pause/Reset controls** for flexible timing
- **Success celebration** when timer completes
- **"Job done. Great work!" message** exactly as requested

### 🎯 Accessibility Features
- **Large, colorful icons** for each activity
- **Clear, simple navigation** with visual cues
- **Encouraging messages** to boost confidence
- **Kid-friendly interface** with intuitive interactions

## Technology Stack

- **React 18** - Modern JavaScript framework
- **React Router** - Client-side routing
- **Vite** - Fast development server and build tool
- **CSS3** - Custom styling with gradients and animations
- **SVG** - Scalable vector graphics for the circular timer

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd kids-daily-schedule
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Usage

### Schedule View
- View all daily tasks with times and durations
- Click on any task to start its countdown timer
- Track progress with the visual progress bar at the top

### Timer View
- Start, pause, or reset the countdown timer
- Watch the circular progress indicator decrease as time passes
- Celebrate task completion with the success message
- Navigate to the next task or return to the schedule

## Customization

### Adding New Tasks
Edit `src/data/schedule.js` to add new tasks:

```javascript
{
  id: 'new-task',
  title: 'New Activity',
  description: 'Description of the activity',
  time: '10:00 AM',
  duration: 30, // in minutes
  icon: '🎯'
}
```

### Styling
- Main schedule styles: `src/styles/SchedulePage.css`
- Timer page styles: `src/styles/TimerPage.css`
- Global styles: `src/styles/index.css`

## Design Philosophy

This application is specifically designed for autistic children with:
- **Predictable routines** with clear time structures
- **Visual cues** using emojis and colors
- **Positive reinforcement** with encouraging messages
- **Sensory-friendly design** with calm colors and smooth animations
- **Simple navigation** to reduce cognitive load

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Designed with love for children with autism
- Icons and emojis for visual accessibility
- Responsive design for use on tablets and phones
