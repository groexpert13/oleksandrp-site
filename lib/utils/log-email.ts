import { v4 as uuidv4 } from 'uuid';

export async function logEmail(
  sql: any,
  bidId: string,
  itemId: string,
  email: string,
  projectName: string,
  bidAmount: number
) {
  await sql`
    CREATE TABLE IF NOT EXISTS email_logs (
      id UUID PRIMARY KEY,
      bid_id UUID NOT NULL,
      item_id TEXT NOT NULL,
      email TEXT NOT NULL,
      project_name TEXT,
      bid_amount FLOAT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE email_logs ADD COLUMN IF NOT EXISTS project_name TEXT`;
  await sql`ALTER TABLE email_logs ADD COLUMN IF NOT EXISTS bid_amount FLOAT`;
  await sql.query(
    'INSERT INTO email_logs (id, bid_id, item_id, email, project_name, bid_amount) VALUES ($1, $2, $3, $4, $5, $6)',
    [uuidv4(), bidId, itemId, email, projectName, bidAmount]
  );
}
