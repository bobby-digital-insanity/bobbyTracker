# Database Migrations

This directory contains database migration files for schema changes.

## Initial Setup

The initial database schema is created automatically via `init.sql` when the Docker container is first started.

## Future Migrations

For future schema changes, you can:

1. Create SQL files with timestamps: `YYYYMMDD_HHMMSS_description.sql`
2. Use a migration tool like [node-pg-migrate](https://www.npmjs.com/package/node-pg-migrate) or [Knex.js](https://knexjs.org/)
3. Apply migrations manually using `psql` or a database client

## Manual Migration Example

```bash
# Connect to database
docker exec -it bobbytracker-db psql -U bobbytracker -d bobbytracker

# Run a migration file
docker exec -i bobbytracker-db psql -U bobbytracker -d bobbytracker < migration_file.sql
```

