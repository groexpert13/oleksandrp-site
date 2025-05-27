import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { AuctionOption } from "@/lib/database-types";
import { marketplaceItems } from "@/lib/marketplace-types";
import { getSql } from '@/lib/neon';
import { logEmail } from '@/lib/utils/log-email';
import { maskEmail } from '@/lib/utils/fake-bids';

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


// GET handler to retrieve auction details for an item
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');
    console.log(`GET request for auction data, itemId: ${itemId}`);

    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    // Start with the in-memory auction data as fallback
    let auction = inMemoryAuctions[itemId];
    let itemBids: any[] = [];
    let hasRealBids = false;
    let highestBid = null;
    let fakeBidCount = 0;

    // Always try to get data from the database first
    try {
      const sql = getSql();
      console.log('Querying database for auction data');
      
      // Get bids from database - this is our primary source of truth
      const bidsResult = await sql`SELECT * FROM "Bid" WHERE itemId = ${itemId} ORDER BY amount DESC`;
      console.log('Bid query result:', JSON.stringify(bidsResult));
      
      itemBids = Array.isArray(bidsResult) ? bidsResult : (bidsResult as any).rows || [];
      
      // If we have bids in the database, use those for highest bid
      if (itemBids.length > 0) {
        hasRealBids = true;
        highestBid = itemBids[0];
        console.log('Found highest bid in database Bid table:', JSON.stringify(highestBid));
      }
      
      // Get auction data from database
      const auctionResult = await sql`SELECT * FROM "AuctionOption" WHERE itemId = ${itemId}`;
      console.log('AuctionOption query result:', JSON.stringify(auctionResult));
      
      const dbAuction = Array.isArray(auctionResult) ? auctionResult : (auctionResult as any).rows || [];
      if (dbAuction.length > 0) {
        auction = { ...dbAuction[0] } as AuctionOption;
        console.log('Found auction in database:', JSON.stringify(auction));
        
        // If the auction has currentHighestBid and currentHighestBidder in the database,
        // it means we have real bids - this takes precedence over Bid table
        if (auction.currentHighestBid && auction.currentHighestBidder) {
          hasRealBids = true;
          // Only override the highest bid if we don't have one from the Bid table
          // or if the one in AuctionOption is higher
          if (!highestBid || auction.currentHighestBid > highestBid.amount) {
            highestBid = {
              amount: auction.currentHighestBid,
              email: auction.currentHighestBidder // Already masked in the database
            };
            console.log('Using highest bid data from AuctionOption table:', JSON.stringify(highestBid));
          }
        }
      }
    } catch (dbError) {
      // Log database errors but continue with in-memory data
      console.error('DB error retrieving auction:', dbError);
    }

    if (!auction) {
      console.log('Auction not found, returning 404');
      return NextResponse.json({ error: 'Auction not found' }, { status: 404 });
    }

    // Get fake bids for count purposes
    try {
      const { getFakeBidData } = await import('@/lib/utils/fake-bids');
      const fakeBids = getFakeBidData(itemId);
      fakeBidCount = fakeBids.count || 0;
      
      // Only use fake data for highest bid if we don't have real bids
      if (!hasRealBids) {
        console.log(`No real bids found. Using ${fakeBidCount} fake bids for item ${itemId}`);
        highestBid = {
          email: fakeBids.email,
          amount: auction.minBid // Use minimum bid as the amount for fake highest bid
        };
        console.log('Using fake bid data for highest bid:', JSON.stringify(highestBid));
      } else {
        console.log(`Found real bids. Adding ${fakeBidCount} fake bids to count only.`);
      }
    } catch (error) {
      console.error('Error getting fake bid data:', error);
    }
    
    // Check in-memory bids only if we don't have real bids from database
    if (!hasRealBids) {
      console.log('Checking in-memory bids');
      const memBids = inMemoryBids.filter(bid => bid.itemId === itemId).sort((a,b) => b.amount - a.amount);
      if (memBids.length > 0) {
        // Only use in-memory bids if they're higher than fake bids
        if (!highestBid || memBids[0].amount > highestBid.amount) {
          highestBid = memBids[0];
          console.log('Found higher bid in memory:', JSON.stringify(highestBid));
        }
      }
    }
    
    // Determine the current highest bid and bidder
    let currentHighestBid = auction.minBid; // Default to minimum bid
    let currentHighestBidder = undefined;
    
    // If we have a highest bid, use it
    if (highestBid) {
      currentHighestBid = highestBid.amount;
      // If the email is already masked (from AuctionOption table), use it as is
      // Otherwise, mask it
      currentHighestBidder = typeof highestBid.email === 'string' && 
                            highestBid.email.includes('*') ? 
                            highestBid.email : maskEmail(highestBid.email);
      console.log(`Using highest bid: $${currentHighestBid} from ${currentHighestBidder}`);
    }
    
    // Calculate total bid count
    // If we have real bids, use the real bid count + fake bids
    // If we don't have real bids, just use fake bid count
    const totalBidCount = hasRealBids ? (itemBids.length + fakeBidCount) : fakeBidCount;
    
    const result = {
      ...auction,
      currentHighestBid,
      currentHighestBidder,
      bidCount: totalBidCount,
      hasRealBids // Add flag to indicate if there are real bids
    } as AuctionOption & { bidCount: number, hasRealBids: boolean };

    console.log('Returning auction result:', JSON.stringify(result));
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching auction data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST handler for submitting a bid
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itemId, email, amount } = body;
    console.log(`POST request for bid, itemId: ${itemId}, email: ${email}, amount: ${amount}`);
    
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
    
    // Check against both in-memory and database bids
    let highestBid = 0;
    let hasRealBids = false;
    
    // First check database bids - they are the source of truth
    try {
      const sql = getSql();
      
      // Check AuctionOption table first - it has the most up-to-date highest bid
      const dbAuctionResult = await sql`SELECT currentHighestBid FROM "AuctionOption" WHERE itemId = ${itemId}`;
      const dbAuction = Array.isArray(dbAuctionResult) ? dbAuctionResult : (dbAuctionResult as any).rows || [];
      
      if (dbAuction.length > 0 && dbAuction[0].currentHighestBid) {
        highestBid = dbAuction[0].currentHighestBid;
        hasRealBids = true;
        console.log(`Found highest bid in AuctionOption table: $${highestBid}`);
      }
      
      // Also check Bid table as a backup
      if (!hasRealBids) {
        const dbBidsResult = await sql`SELECT amount FROM "Bid" WHERE itemId = ${itemId} ORDER BY amount DESC LIMIT 1`;
        const dbBids = Array.isArray(dbBidsResult) ? dbBidsResult : (dbBidsResult as any).rows || [];
        
        if (dbBids.length > 0) {
          hasRealBids = true;
          if (dbBids[0].amount > highestBid) {
            highestBid = dbBids[0].amount;
            console.log(`Found higher bid in Bid table: $${highestBid}`);
          }
        }
      }
    } catch (dbError) {
      console.error('DB error checking highest bid:', dbError);
    }
    
    // Then check in-memory bids if we don't have real bids
    if (!hasRealBids) {
      const currentBids = inMemoryBids.filter(bid => bid.itemId === itemId);
      if (currentBids.length > 0) {
        const memHighestBid = Math.max(...currentBids.map(bid => bid.amount));
        if (memHighestBid > highestBid) {
          highestBid = memHighestBid;
          console.log(`Found higher bid in memory: $${highestBid}`);
        }
      }
    }
    
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
    
    // Add to in-memory storage
    inMemoryBids.push(newBid);

    // Create masked email for display
    const maskedEmail = maskEmail(email);
    console.log(`Original email: ${email}, masked email: ${maskedEmail}`);
    
    // Update the auction with new highest bid
    inMemoryAuctions[itemId] = {
      ...inMemoryAuctions[itemId],
      currentHighestBid: amount,
      currentHighestBidder: maskedEmail,
      bidCount: (inMemoryAuctions[itemId].bidCount || 0) + 1,
      hasRealBids: true
    };

    // Persist bid and auction to database
    try {
      const sql = getSql();
      
      // First insert the bid with full email (for record keeping)
      try {
        await sql.query(
          'INSERT INTO "Bid" (id, itemId, email, amount, createdAt, updatedAt) VALUES ($1,$2,$3,$4,NOW(),NOW())',
          [newBid.id, itemId, email, amount]
        );
        console.log('Successfully inserted bid into database');
      } catch (bidError) {
        console.error('Failed to insert bid into database:', bidError);
        // Continue execution even if bid insertion fails
      }
      
      // Then update the auction with the new highest bid using masked email
      try {
        // Check if auction already exists
        const existingAuction = await sql`SELECT id FROM "AuctionOption" WHERE itemId = ${itemId}`;
        const auctionExists = Array.isArray(existingAuction) ? 
                              existingAuction.length > 0 : 
                              ((existingAuction as any).rows || []).length > 0;
        
        if (auctionExists) {
          // Update existing auction
          await sql.query(
            `UPDATE "AuctionOption" 
             SET currentHighestBid = $1, currentHighestBidder = $2 
             WHERE itemId = $3`,
            [amount, maskedEmail, itemId]
          );
          console.log('Successfully updated existing auction in database');
        } else {
          // Insert new auction
          await sql.query(
            `INSERT INTO "AuctionOption" (id, itemId, startDate, endDate, minBid, currentHighestBid, currentHighestBidder)
             VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            [inMemoryAuctions[itemId].id, itemId, inMemoryAuctions[itemId].startDate, inMemoryAuctions[itemId].endDate, inMemoryAuctions[itemId].minBid, amount, maskedEmail]
          );
          console.log('Successfully inserted new auction in database');
        }
      } catch (auctionError) {
        console.error('Failed to update auction in database:', auctionError);
        // Continue execution even if auction update fails
      }
    } catch (e) {
      console.error('DB error persisting bid:', e);
      // ignore DB errors for persistence
    }
    
    // Try to store in marketplace_stats and log sent email
    try {
      const sql = getSql();
      
      // Insert marketplace stats
      try {
        await sql.query(
          `INSERT INTO marketplace_stats (item_id, likes, views)
           VALUES ($1, 0, 0)
           ON CONFLICT (item_id) DO NOTHING`,
          [itemId]
        );
        console.log('Successfully inserted/updated marketplace stats');
      } catch (statsError) {
        console.error('Failed to insert/update marketplace stats:', statsError);
      }

      // Log the email
      try {
        await logEmail(sql, newBid.id, itemId, email, item.title, amount);
        console.log('Successfully logged email');
      } catch (emailError) {
        console.error('Failed to log email:', emailError);
      }
    } catch (error) {
      console.error('Error with marketplace stats or email logging:', error);
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