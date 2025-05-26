import { neon } from '@neondatabase/serverless';

let cached: ReturnType<typeof neon> | null = null;

export function getSql() {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL env var not set');
  }
  cached = neon(url);
  return cached;
}
