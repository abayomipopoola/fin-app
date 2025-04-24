import { createDbConnection } from '@/db/connection';
import env from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function runMigrations() {
  if (!env.DB_MIGRATING) {
    throw new Error('You must set DB_MIGRATING to "true" when running migrations');
  }

  const { migration: connection } = createDbConnection();
  const db = drizzle({
    connection,
    logger: true,
  });

  try {
    await migrate(db, { migrationsFolder: './src/db/migrations' });
  } finally {
    await db.$client.end();
  }
}

await runMigrations();
