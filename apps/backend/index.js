import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { query, checkDatabaseHealth, closeDatabaseConnection } from './db/db.js';

const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bobby Tracker API is running!' });
});

app.get('/api/health', async (req, res) => {
  const dbHealth = await checkDatabaseHealth();
  res.json({
    status: dbHealth.status === 'healthy' ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbHealth
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

// Database API Routes

// Get all trackers
app.get('/api/trackers', async (req, res) => {
  try {
    const result = await query('SELECT * FROM trackers ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching trackers:', error);
    res.status(500).json({ error: 'Failed to fetch trackers' });
  }
});

// Get a single tracker by ID
app.get('/api/trackers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM trackers WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tracker not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching tracker:', error);
    res.status(500).json({ error: 'Failed to fetch tracker' });
  }
});

// Create a new tracker
app.post('/api/trackers', async (req, res) => {
  try {
    const { user_id, name, description, color } = req.body;
    const result = await query(
      'INSERT INTO trackers (user_id, name, description, color) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, name, description, color]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating tracker:', error);
    res.status(500).json({ error: 'Failed to create tracker' });
  }
});

// Update a tracker
app.put('/api/trackers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, color } = req.body;
    const result = await query(
      'UPDATE trackers SET name = $1, description = $2, color = $3 WHERE id = $4 RETURNING *',
      [name, description, color, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tracker not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating tracker:', error);
    res.status(500).json({ error: 'Failed to update tracker' });
  }
});

// Delete a tracker
app.delete('/api/trackers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM trackers WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tracker not found' });
    }
    res.json({ message: 'Tracker deleted successfully', tracker: result.rows[0] });
  } catch (error) {
    console.error('Error deleting tracker:', error);
    res.status(500).json({ error: 'Failed to delete tracker' });
  }
});

// Get entries for a tracker
app.get('/api/trackers/:id/entries', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM tracker_entries WHERE tracker_id = $1 ORDER BY timestamp DESC',
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tracker entries:', error);
    res.status(500).json({ error: 'Failed to fetch tracker entries' });
  }
});

// Create a new tracker entry
app.post('/api/trackers/:id/entries', async (req, res) => {
  try {
    const { id } = req.params;
    const { notes, value, timestamp } = req.body;
    const result = await query(
      'INSERT INTO tracker_entries (tracker_id, notes, value, timestamp) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, notes, value, timestamp || new Date()]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating tracker entry:', error);
    res.status(500).json({ error: 'Failed to create tracker entry' });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await query('SELECT id, username, email, created_at FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await closeDatabaseConnection();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await closeDatabaseConnection();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🗄️  Database: PostgreSQL`);
});

