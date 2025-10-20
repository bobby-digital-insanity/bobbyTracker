# Bobby Tracker Backend

Node.js Express API with PostgreSQL database for Bobby Tracker.

## Prerequisites

- Node.js >= 20.0.0
- Docker and Docker Compose (for PostgreSQL)

## Setup

### 1. Install Dependencies

From the root of the monorepo:
```bash
npm install
```

Or from the backend directory:
```bash
cd apps/backend
npm install
```

### 2. Start PostgreSQL Database

From the root of the monorepo:
```bash
docker-compose up -d
```

This will:
- Start a PostgreSQL 16 container
- Create the database and initial schema automatically
- Expose PostgreSQL on port 5432
- Create sample data for testing

To stop the database:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```

### 3. Configure Environment Variables

The `.env` file is already created with default values:
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bobbytracker
DB_USER=bobbytracker
DB_PASSWORD=bobbytracker_dev_password
```

## Development

Start the backend server:
```bash
npm run dev
```

Server will run on http://localhost:3000

## API Endpoints

### General
- `GET /` - Root endpoint
- `GET /api/health` - Health check (includes database status)
- `GET /api/hello` - Hello world

### Users
- `GET /api/users` - Get all users

### Trackers
- `GET /api/trackers` - Get all trackers
- `GET /api/trackers/:id` - Get a single tracker by ID
- `POST /api/trackers` - Create a new tracker
  - Body: `{ user_id, name, description, color }`
- `PUT /api/trackers/:id` - Update a tracker
  - Body: `{ name, description, color }`
- `DELETE /api/trackers/:id` - Delete a tracker

### Tracker Entries
- `GET /api/trackers/:id/entries` - Get all entries for a tracker
- `POST /api/trackers/:id/entries` - Create a new entry for a tracker
  - Body: `{ notes?, value?, timestamp? }`

### Other
- `POST /api/randomizeColors` - Get randomized colors

## Database Management

### Access PostgreSQL CLI

```bash
docker exec -it bobbytracker-db psql -U bobbytracker -d bobbytracker
```

### View Logs

```bash
docker logs bobbytracker-db
```

### Run SQL Files

```bash
docker exec -i bobbytracker-db psql -U bobbytracker -d bobbytracker < path/to/file.sql
```

## Database Schema

The database includes the following tables:

- **users** - User accounts
- **trackers** - Different habits/activities to track
- **tracker_entries** - Individual tracking events/logs

See `db/init.sql` for the complete schema definition.

## Production Notes

For production deployment:
1. Use secure passwords and store them in environment variables
2. Use a managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)
3. Set `NODE_ENV=production`
4. Enable SSL for database connections
5. Implement proper authentication and authorization

