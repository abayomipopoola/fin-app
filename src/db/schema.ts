import { pgTable } from 'drizzle-orm/pg-core';

export const todo = pgTable('todo', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
}));
