import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { id, content, expiresIn = 10800 } = await request.json();
    
    if (!id || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: id and content' },
        { status: 400 }
      );
    }
    
    // Calculate expiration time (default is 3 hours from now)
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
    
    // Create metadata object
    const metadata = {
      expiresAt: expiresAt.toISOString(),
    };
    
    // Upload to Vercel Blob with the id as a pathname
    const blob = await put(`slides/${id}.md`, content, {
      access: 'public',
      // We use the Blob's "addRandomSuffix: false" to ensure we can access it by ID
      addRandomSuffix: false,
      // @ts-expect-error metadata option accepted at runtime
      metadata: {
        'expires-at': expiresAt.toISOString(),
      }
    });
    
    return NextResponse.json({
      success: true,
      url: blob.url,
      id,
      expiresAt: expiresAt.toISOString()
    });
  } catch (error) {
    console.error('Error uploading slides:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 