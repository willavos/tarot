# Mystic Tarot

A beautiful and interactive Tarot card reading application built with React and Framer Motion. Users can ask questions, draw cards from a beautifully animated spread, and receive detailed readings powered by AI.

## Features

- Interactive card selection with fluid animations
- Customizable number of cards (1-10)
- Card reversals for deeper readings
- Beautiful UI with mystical theme
- Full Tarot deck with Major and Minor Arcana
- Detailed card meanings and interpretations
- AI-powered reading generation

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Express + Groq API

## Getting Started

### Frontend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file with your Groq API key:
   ```
   GROQ_API_KEY=your-api-key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Deployment

### Frontend
1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your hosting provider of choice (Netlify, Vercel, etc)

### Backend
1. Deploy the server directory to a Node.js hosting platform like:
   - Heroku
   - DigitalOcean
   - Railway
   - Render

2. Set the environment variables on your hosting platform
3. Update the API URL in the frontend configuration

## Development

The frontend will be running on `http://localhost:5173` and the backend on `http://localhost:3000`
```
