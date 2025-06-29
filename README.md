# Circle Sequence Game

A React-based puzzle game where players must click circles in numerical order from 1 to N.

## 🎮 Game Overview

Circle Sequence Game is an engaging puzzle game that challenges players to click circles in the correct numerical sequence. The game features random circle positioning, smooth animations, and multiple difficulty levels.

### How to Play
1. Set the number of points (circles) you want to play with (1-20,000)
2. Click "Play" to start the game
3. Click circles in numerical order from 1 to N
4. If you click the wrong number, the game ends
5. Complete all circles to win!

### Features
- **Random Circle Positioning**: Advanced collision detection for optimal circle placement
- **Sequential Clicking**: Must click circles in exact numerical order
- **Fade Animation**: Smooth fade-out effect when circles are clicked correctly
- **Timer**: Tracks your completion time
- **Auto Play**: Watch the game solve itself automatically
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Performance Optimized**: Smooth gameplay even with thousands of circles

## 📁 Project Structure

```
src/
├── pages/               # Page components
│   └── CircleSequenceGame.jsx  # Main game page
├── components/          # Reusable UI components
│   ├── GameBoard.jsx           # Game board container
│   ├── GameCircle.jsx          # Individual circle component
│   ├── GameControls.jsx        # Game controls (buttons, inputs)
│   └── GameStatus.jsx          # Game status display
├── hooks/              # Custom React hooks
│   └── useGameLogic.js         # Game logic and state management
├── constants/          # Game constants and configuration
│   └── gameConfig.js           # Game settings and enums
├── utils/              # Utility functions
│   └── gameUtils.js            # Game utility functions
├── styles/             # CSS styles
│   └── GameStyles.css          # Game-specific styles
├── App.js              # Main App component
├── index.js            # Application entry point
└── index.css           # Global styles
```

## 🏗️ Architecture

### Component Hierarchy
```
App
└── CircleSequenceGame (Page)
    ├── GameStatus
    ├── GameControls
    └── GameBoard
        └── GameCircle (multiple)
```

### State Management
- **Custom Hook**: `useGameLogic` manages all game state
- **Local State**: Each component manages its own UI state
- **Props**: Data flows down from parent to child components
- **Callbacks**: Events bubble up through callback functions

### Performance Optimizations
- **React.memo**: Prevents unnecessary re-renders
- **useMemo**: Memoizes expensive calculations
- **useCallback**: Stabilizes function references
- **Hardware Acceleration**: Uses `transform3d` for smooth animations
- **Efficient Algorithms**: Optimized circle positioning and collision detection

## 🎯 Technical Features

### Game Logic
- **Random Positioning**: Advanced algorithm with collision detection
- **Fallback Grid**: Ensures all circles can be placed even at high densities
- **Fade System**: Smooth countdown and removal animations
- **Auto Play**: Intelligent sequential clicking simulation

### UI/UX
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: CSS transitions and transforms
- **Visual Feedback**: Hover effects and status indicators
- **Accessibility**: Keyboard navigation and screen reader support

### Code Quality
- **Modular Architecture**: Separated concerns for maintainability
- **Type Safety**: PropTypes for component validation
- **Error Handling**: Graceful error recovery
- **Performance Monitoring**: Optimized for smooth gameplay

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clearthepoints
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner in interactive mode
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎨 Customization

### Game Configuration
Edit `src/constants/gameConfig.js` to modify:
- Circle size and spacing
- Animation durations
- Auto-play timing
- Min/max point limits

### Styling
Modify `src/styles/GameStyles.css` to customize:
- Colors and themes
- Layout and spacing
- Animations and transitions
- Responsive breakpoints

### Game Logic
Update `src/hooks/useGameLogic.js` to add:
- New game modes
- Scoring systems
- Power-ups or special effects
- Multiplayer features

## 🔧 Development

### Adding New Features
1. Create new components in `src/components/`
2. Add custom hooks in `src/hooks/`
3. Update constants in `src/constants/`
4. Add utility functions in `src/utils/`
5. Style with CSS in `src/styles/`

### Best Practices
- Use functional components with hooks
- Implement proper error boundaries
- Write meaningful component names
- Add PropTypes for validation
- Optimize for performance
- Test thoroughly before deployment

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Powered by [React](https://reactjs.org/)
- Styled with modern CSS
- Optimized for performance and user experience
