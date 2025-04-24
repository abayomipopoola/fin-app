import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { createDbConnection } from './connection';

const { app: connection } = createDbConnection();
export const db = drizzle({
  connection,
  logger: true,
  schema: schema,
  casing: 'snake_case',
});

export default db;
