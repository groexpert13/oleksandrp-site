import { v4 as uuidv4 } from 'uuid';

export async function logEmail(sql: any, bidId: string, itemId: string, email: string) {
  await sql`
    CREATE TABLE IF NOT EXISTS email_logs (
      id UUID PRIMARY KEY,
      bid_id UUID NOT NULL,
      item_id TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql.query(
    'INSERT INTO email_logs (id, bid_id, item_id, email) VALUES ($1, $2, $3, $4)',
    [uuidv4(), bidId, itemId, email]
  );
}
