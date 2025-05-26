import { NextResponse } from 'next/server';
import { sql } from '@/lib/neon';

// Получить все лайки и просмотры
export async function GET() {
  const rows = await sql`SELECT * FROM card_stats`;
  const cards: Record<string, { count: number; views: number }> = {};
  for (const row of rows) {
    cards[row.card_id] = { count: row.likes, views: row.views };
  }
  return NextResponse.json({ cards });
}

// Увеличить лайк
export async function POST(request: Request) {
  const { cardId } = await request.json();
  if (!cardId) return NextResponse.json({ error: 'Missing cardId' }, { status: 400 });

  await sql.query(
    `INSERT INTO card_stats (card_id, likes, views)
     VALUES ($1, 1, 0)
     ON CONFLICT (card_id) DO UPDATE SET likes = card_stats.likes + 1`,
    [cardId]
  );
  const { rows } = await sql.query('SELECT likes FROM card_stats WHERE card_id = $1', [cardId]);
  return NextResponse.json({ success: true, cardId, likes: rows?.[0]?.likes ?? 0 });
}

// Увеличить просмотр (с защитой от двойного инкремента)
const recentViews: Record<string, number> = {};
export async function PUT(request: Request) {
  const { cardId } = await request.json();
  if (!cardId) return NextResponse.json({ error: 'Missing cardId' }, { status: 400 });

  // Защита: если был PUT для этого cardId менее 2 секунд назад, не увеличиваем
  const now = Date.now();
  if (recentViews[cardId] && now - recentViews[cardId] < 2000) {
    const { rows } = await sql.query('SELECT views FROM card_stats WHERE card_id = $1', [cardId]);
    return NextResponse.json({ success: true, cardId, views: rows?.[0]?.views ?? 0 });
  }
  recentViews[cardId] = now;

  await sql.query(
    `INSERT INTO card_stats (card_id, likes, views)
     VALUES ($1, 0, 1)
     ON CONFLICT (card_id) DO UPDATE SET views = card_stats.views + 1`,
    [cardId]
  );
  const { rows } = await sql.query('SELECT views FROM card_stats WHERE card_id = $1', [cardId]);
  return NextResponse.json({ success: true, cardId, views: rows?.[0]?.views ?? 0 });
} 