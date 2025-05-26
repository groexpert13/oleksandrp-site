import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { AuctionOption } from "@/lib/database-types";
import { marketplaceItems } from "@/lib/marketplace-types";
import { getSql } from '@/lib/neon';
import { logEmail } from '@/lib/utils/log-email';

// In-memory storage
const inMemoryBids: any[] = [];
let inMemoryAuctions: Record<string, AuctionOption> = {};

// Generate auction options for each marketplace item
const generateAuctionOptions = (): AuctionOption[] => {
  return marketplaceItems.map(item => {
    const now = new Date();
    // Generate random duration with non-round numbers (days, hours, minutes)
    const minDays = 3;
    const maxDays = 21;
    const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
    const randomHours = Math.floor(Math.random() * 24); // Random hours (0-23)
    const randomMinutes = Math.floor(Math.random() * 60); // Random minutes (0-59)
    
    // Convert to milliseconds
    const duration = (randomDays * 24 * 60 * 60 * 1000) + // Days
                    (randomHours * 60 * 60 * 1000) +     // Hours
                    (randomMinutes * 60 * 1000);         // Minutes
    
    const endDate = new Date(now.getTime() + duration);
    
    const auction = {
      id: `auction-${item.id}`,
      itemId: item.id,
      startDate: now,
      endDate,
      minBid: item.price * 0.8, // Minimum bid starts at 80% of the price
      bidCount: 0,
    };
    
    // Store in memory
    inMemoryAuctions[item.id] = auction;
    
    return auction;
  });
};

// Initialize auctions
const auctionOptions = generateAuctionOptions();

// Helper to mask email
const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@');
  const maskedUsername = username.substring(0, 2) + '*'.repeat(username.length - 2);
  return `${maskedUsername}@${domain}`;
};

// GET handler to retrieve auction details for an item
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get('itemId');
  
  if (!itemId) {
    return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
  }
  
  const auction = inMemoryAuctions[itemId];
  if (!auction) {
    return NextResponse.json({ error: 'Auction not found' }, { status: 404 });
  }
  
  // Get all bids for this item, sorted by amount in descending order
  const itemBids = inMemoryBids
    .filter(bid => bid.itemId === itemId)
    .sort((a, b) => b.amount - a.amount);
  
  const highestBid = itemBids.length > 0 ? itemBids[0] : null;
  const result = {
    ...auction,
    currentHighestBid: highestBid?.amount,
    currentHighestBidder: highestBid ? maskEmail(highestBid.email) : undefined,
    bidCount: itemBids.length,
  };
  
  return NextResponse.json(result);
}

// POST handler for submitting a bid
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itemId, email, amount } = body;
    
    // Validate inputs
    if (!itemId || !email || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    
    // Check if item exists
    const item = marketplaceItems.find(i => i.id === itemId);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    const auction = inMemoryAuctions[itemId];
    if (!auction) {
      return NextResponse.json({ error: 'Auction not found' }, { status: 404 });
    }
    
    // Check if auction is still active
    const now = new Date();
    if (now > auction.endDate) {
      return NextResponse.json({ error: 'Auction has ended' }, { status: 400 });
    }
    
    // Check if bid meets minimum
    if (amount < auction.minBid) {
      return NextResponse.json({ 
        error: `Bid must be at least $${auction.minBid}` 
      }, { status: 400 });
    }
    
    // Check if higher than current highest bid
    const currentBids = inMemoryBids.filter(bid => bid.itemId === itemId);
    const highestBid = currentBids.length > 0 
      ? Math.max(...currentBids.map(bid => bid.amount)) 
      : 0;
      
    if (amount <= highestBid) {
      return NextResponse.json({ 
        error: `Bid must be higher than current highest bid ($${highestBid})` 
      }, { status: 400 });
    }
    
    // Create and store the bid
    const newBid = {
      id: uuidv4(),
      itemId,
      email,
      amount,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    inMemoryBids.push(newBid);
    
    // Update the auction with new highest bid
    inMemoryAuctions[itemId] = {
      ...inMemoryAuctions[itemId],
      currentHighestBid: amount,
      currentHighestBidder: maskEmail(email),
      bidCount: (inMemoryAuctions[itemId].bidCount || 0) + 1
    };
    
    // Try to store in marketplace_stats and log sent email
    try {
      const sql = getSql();
      await sql.query(
        `INSERT INTO marketplace_stats (item_id, likes, views)
         VALUES ($1, 0, 0)
         ON CONFLICT (item_id) DO NOTHING`,
        [itemId]
      );

      await logEmail(sql, newBid.id, itemId, email);
    } catch (error) {
      // Ignore errors with marketplace_stats or email logging
    }
    
    return NextResponse.json({
      success: true,
      message: 'Bid placed successfully',
      bidId: newBid.id
    });
  } catch (error) {
    console.error('Error processing bid:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 