import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function connectToDatabase() {
  const client = await pool.connect();
  return { db: client, client };
}
