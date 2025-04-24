import env from '@/env';
import logger from '@/utils/logger';
import postgres from 'postgres';

export type ConnectionOptions = {
  url?: string;
} & postgres.Options<Record<string, postgres.PostgresType>>;

export function createDbConnection() {
  // Base connection configuration shared across all connection types
  const baseConnection: ConnectionOptions = {
    url: env.DATABASE_URL,
    onnotice: (notice: postgres.Notice) => {
      logger.info(notice, 'Postgres Notice');
    },
  };

  // Connection for main application with default connection pooling
  const app: ConnectionOptions = {
    ...baseConnection,
  };

  // Single connection for migrations and seeding
  const migration: ConnectionOptions = {
    ...baseConnection,
    max: 1,
  };

  return {
    app,
    migration,
  };
}
