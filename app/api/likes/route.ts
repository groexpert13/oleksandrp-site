import { NextResponse } from 'next/server';
import { getSql } from '@/lib/neon';

// Get all likes and views for cards and marketplace items
export async function GET() {
  const sql = getSql();
  
  // Get card stats
  const cardRows = (await sql`SELECT * FROM card_stats`) as any[];
  const cards: Record<string, { count: number; views: number }> = {};
  for (const row of cardRows) {
    cards[row.card_id] = { count: row.likes, views: row.views };
  }
  
  // Get marketplace item stats
  try {
    const itemRows = (await sql`SELECT * FROM marketplace_stats`) as any[];
    const items: Record<string, { count: number; views: number }> = {};
    for (const row of itemRows) {
      items[row.item_id] = { count: row.likes, views: row.views };
    }
    return NextResponse.json({ cards, items });
  } catch (error) {
    // If marketplace_stats table doesn't exist yet, create it
    await sql`
      CREATE TABLE IF NOT EXISTS marketplace_stats (
        item_id TEXT PRIMARY KEY,
        likes INTEGER NOT NULL DEFAULT 0,
        views INTEGER NOT NULL DEFAULT 0
      )
    `;
    return NextResponse.json({ cards, items: {} });
  }
}

// Increase likes for cards or marketplace items
export async function POST(request: Request) {
  const sql = getSql();
  const body = await request.json();
  const { cardId, itemId } = body;
  
  if (cardId) {
    // Handle card likes
    await sql.query(
      `INSERT INTO card_stats (card_id, likes, views)
       VALUES ($1, 1, 0)
       ON CONFLICT (card_id) DO UPDATE SET likes = card_stats.likes + 1`,
      [cardId]
    );
    const result = await sql.query('SELECT likes FROM card_stats WHERE card_id = $1', [cardId]);
    const rows = result as any[];
    return NextResponse.json({ success: true, cardId, likes: rows[0]?.likes ?? 0 });
  } else if (itemId) {
    // Handle marketplace item likes
    try {
      await sql.query(
        `INSERT INTO marketplace_stats (item_id, likes, views)
         VALUES ($1, 1, 0)
         ON CONFLICT (item_id) DO UPDATE SET likes = marketplace_stats.likes + 1`,
        [itemId]
      );
      const result = await sql.query('SELECT likes FROM marketplace_stats WHERE item_id = $1', [itemId]);
      const rows = result as any[];
      return NextResponse.json({ success: true, itemId, likes: rows[0]?.likes ?? 0 });
    } catch (error) {
      // Create table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS marketplace_stats (
          item_id TEXT PRIMARY KEY,
          likes INTEGER NOT NULL DEFAULT 0,
          views INTEGER NOT NULL DEFAULT 0
        )
      `;
      await sql.query(
        `INSERT INTO marketplace_stats (item_id, likes, views) VALUES ($1, 1, 0)`,
        [itemId]
      );
      return NextResponse.json({ success: true, itemId, likes: 1 });
    }
  } else {
    return NextResponse.json({ error: 'Missing cardId or itemId' }, { status: 400 });
  }
}

// Increase views (with protection against double increments)
const recentViews: Record<string, number> = {};
export async function PUT(request: Request) {
  const sql = getSql();
  const body = await request.json();
  const { cardId, itemId } = body;
  const now = Date.now();
  
  if (cardId) {
    // Handle card views
    // Protection: don't increment if viewed less than 2 seconds ago
    if (recentViews[`card-${cardId}`] && now - recentViews[`card-${cardId}`] < 2000) {
      const result = await sql.query('SELECT views FROM card_stats WHERE card_id = $1', [cardId]);
      const rows = result as any[];
      return NextResponse.json({ success: true, cardId, views: rows[0]?.views ?? 0 });
    }
    recentViews[`card-${cardId}`] = now;

    await sql.query(
      `INSERT INTO card_stats (card_id, likes, views)
       VALUES ($1, 0, 1)
       ON CONFLICT (card_id) DO UPDATE SET views = card_stats.views + 1`,
      [cardId]
    );
    const result = await sql.query('SELECT views FROM card_stats WHERE card_id = $1', [cardId]);
    const rows = result as any[];
    return NextResponse.json({ success: true, cardId, views: rows[0]?.views ?? 0 });
  } else if (itemId) {
    // Handle marketplace item views
    // Protection: don't increment if viewed less than 2 seconds ago
    if (recentViews[`item-${itemId}`] && now - recentViews[`item-${itemId}`] < 2000) {
      const result = await sql.query('SELECT views FROM marketplace_stats WHERE item_id = $1', [itemId]);
      const rows = result as any[];
      return NextResponse.json({ success: true, itemId, views: rows[0]?.views ?? 0 });
    }
    recentViews[`item-${itemId}`] = now;

    try {
      await sql.query(
        `INSERT INTO marketplace_stats (item_id, likes, views)
         VALUES ($1, 0, 1)
         ON CONFLICT (item_id) DO UPDATE SET views = marketplace_stats.views + 1`,
        [itemId]
      );
      const result = await sql.query('SELECT views FROM marketplace_stats WHERE item_id = $1', [itemId]);
      const rows = result as any[];
      return NextResponse.json({ success: true, itemId, views: rows[0]?.views ?? 0 });
    } catch (error) {
      // Create table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS marketplace_stats (
          item_id TEXT PRIMARY KEY,
          likes INTEGER NOT NULL DEFAULT 0,
          views INTEGER NOT NULL DEFAULT 0
        )
      `;
      await sql.query(
        `INSERT INTO marketplace_stats (item_id, likes, views) VALUES ($1, 0, 1)`,
        [itemId]
      );
      return NextResponse.json({ success: true, itemId, views: 1 });
    }
  } else {
    return NextResponse.json({ error: 'Missing cardId or itemId' }, { status: 400 });
  }
} 