-- Add optional columns to email_logs table for project and amount
ALTER TABLE email_logs ADD COLUMN IF NOT EXISTS project_name TEXT;
ALTER TABLE email_logs ADD COLUMN IF NOT EXISTS bid_amount FLOAT;
