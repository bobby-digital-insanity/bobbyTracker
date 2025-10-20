import pg from 'pg';
const { Pool } = pg;

// Database configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'bobbytracker',
  user: process.env.DB_USER || 'bobbytracker',
  password: process.env.DB_PASSWORD || 'bobbytracker_dev_password',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

// Helper function to execute queries
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', { text, error: error.message });
    throw error;
  }
};

// Helper function to get a client from the pool for transactions
export const getClient = () => {
  return pool.connect();
};

// Function to check database health
export const checkDatabaseHealth = async () => {
  try {
    const result = await query('SELECT NOW() as now');
    return {
      status: 'healthy',
      timestamp: result.rows[0].now
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message
    };
  }
};

// Graceful shutdown
export const closeDatabaseConnection = async () => {
  await pool.end();
  console.log('🔌 Database connection pool closed');
};

export default pool;

