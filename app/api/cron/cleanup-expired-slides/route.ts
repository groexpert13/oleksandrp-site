import { list, del, head } from '@vercel/blob';
import { NextResponse } from 'next/server';

// This API route should be called by a cron job (e.g. every hour)
// Vercel Cron Jobs docs: https://vercel.com/docs/cron-jobs
export async function GET(request: Request) {
  try {
    // Validate the request comes from a legitimate cron job
    // In production, you should use a more secure authorization mechanism
    const authHeader = request.headers.get('Authorization');
    
    // Simple authorization check (replace with your actual secret)
    // For better security, use Vercel's environment variables and CRON_SECRET
    if (process.env.NODE_ENV === 'production' && 
        (!authHeader || !authHeader.startsWith('Bearer ') || 
         authHeader.replace('Bearer ', '') !== process.env.CRON_SECRET)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // List all blobs in the slides folder
    let cursor: string | undefined;
    const expiredBlobs = [];
    const now = new Date();
    
    do {
      const { blobs, cursor: newCursor } = await list({ 
        prefix: 'slides/',
        cursor,
        limit: 100 // Process in batches
      });
      
      // Check each blob to see if it's expired
      for (const blob of blobs) {
        try {
          const metadataRaw = await head(blob.url);

          const metadata = metadataRaw as any;
          const expiresAtStr = metadata.metadata?.['expires-at'];
          
          if (expiresAtStr) {
            const expiresAt = new Date(expiresAtStr);
            if (now > expiresAt) {
              expiredBlobs.push(blob.url);
            }
          }
        } catch (error) {
          console.error(`Error checking blob ${blob.url}:`, error);
          // Continue with other blobs even if one fails
        }
      }
      
      cursor = newCursor;
    } while (cursor);
    
    // Delete expired blobs if there are any
    if (expiredBlobs.length > 0) {
      await del(expiredBlobs);
    }
    
    return NextResponse.json({ 
      success: true, 
      deletedCount: expiredBlobs.length,
      message: `Deleted ${expiredBlobs.length} expired presentations`
    });
  } catch (error) {
    console.error('Error cleaning up expired presentations:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 