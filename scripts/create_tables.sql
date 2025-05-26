-- Create AuctionOption table
CREATE TABLE IF NOT EXISTS AuctionOption (
  id TEXT PRIMARY KEY,
  itemId TEXT UNIQUE,
  startDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  endDate DATETIME NOT NULL,
  minBid REAL NOT NULL,
  currentHighestBid REAL,
  currentHighestBidder TEXT
);

-- Create Bid table
CREATE TABLE IF NOT EXISTS Bid (
  id TEXT PRIMARY KEY,
  itemId TEXT NOT NULL,
  email TEXT NOT NULL,
  amount REAL NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on itemId for better performance
CREATE INDEX IF NOT EXISTS idx_bid_itemId ON Bid(itemId);

-- Create Email Logs table with project and amount info
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY,
  bid_id UUID NOT NULL,
  item_id TEXT NOT NULL,
  email TEXT NOT NULL,
  project_name TEXT,
  bid_amount FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
