CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY,
  bid_id UUID NOT NULL,
  item_id TEXT NOT NULL,
  email TEXT NOT NULL,
  project_name TEXT,
  bid_amount FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
