import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_PORT: z.coerce.number().positive().default(5432),
  DATABASE_URL: z.string().min(1),
  DB_MIGRATING: z.coerce.boolean().default(false),
  DB_SEEDING: z.coerce.boolean().default(false),
});

expand(config());

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const missing = result.error.issues.map((issue) => issue.path[0]).join(', ');
  throw new Error(`Missing/invalid env vars: ${missing}`);
}

export default result.data;
