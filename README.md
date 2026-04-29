# Game Apps

A collection of mini games and scoring tools built with React, Vite, and React Router.

## Available Games

- **🎟️ Ticket to Ride Scorer** - Track scores for the board game Ticket to Ride with support for multiple editions (USA, Europe) and real-time scoreboarding.

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5174` (or next available port).

### Build

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Router configuration
└── pages/
    ├── Home.jsx          # Landing page with game list
    └── TicketToRide/
        └── index.jsx     # Ticket to Ride scorer
```

## Adding a New Game

1. Create a new folder under `src/pages/[GameName]/`
2. Add `index.jsx` with your game component
3. Import and add a route in `src/App.jsx`:

```jsx
import YourGame from './pages/YourGame'

// In the Routes component:
<Route path="/your-game" element={<YourGame />} />
```

4. Add the game to the home page list in `src/pages/Home.jsx`

## Deployment

This project is deployed to Firebase Hosting with GitHub Actions CI/CD.

### Automatic Deployment

- **Pushes to `main`**: Deployed to live Firebase Hosting
- **Pull Requests**: Preview deployments with temporary URLs

### Manual Deployment

```bash
firebase deploy
```

Requires Firebase CLI setup and service account authentication.

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router 6** - Client-side routing
- **Firebase Hosting** - Deployment

## License

Private
