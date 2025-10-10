import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bobby Tracker API is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from Bobby Tracker backend!',
    version: '1.0.0'
  });
});

// Randomize colors endpoint
app.post('/api/randomizeColors', (req, res) => {
  // Colors from App.css - gradient from red to green
  const colors = [
    '#ff4444',  // Red
    '#ff6b35',  // Red-Orange
    '#ff8c42',  // Orange
    '#ffad5a',  // Light Orange
    '#ffd23f',  // Yellow-Orange
    '#ffff00',  // Yellow
    '#d4e157',  // Yellow-Green
    '#9ccc65',  // Light Green
    '#66bb6a',  // Green
    '#4caf50'   // Dark Green
  ];
  
  // Shuffle the colors array
  const shuffled = [...colors].sort(() => Math.random() - 0.5);
  
  res.json({
    colors: shuffled,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

