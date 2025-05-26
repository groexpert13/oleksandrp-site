import { head } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required query parameter: id' },
        { status: 400 }
      );
    }
    
    // Try to get the blob metadata
    try {
      const blob = await head(`slides/${id}.md`);
      
      // Check if the blob exists
      if (!blob) {
        return NextResponse.json(
          { error: 'Presentation not found' },
          { status: 404 }
        );
      }
      
      // Check if the presentation has expired
      const expiresAtHeader = blob.customMetadata?.['expires-at'];
      if (expiresAtHeader) {
        const expiresAt = new Date(expiresAtHeader);
        if (new Date() > expiresAt) {
          return NextResponse.json(
            { error: 'Presentation has expired' },
            { status: 410 } // Gone
          );
        }
      }
      
      // Fetch the content from the URL
      const response = await fetch(blob.url);
      if (!response.ok) {
        throw new Error('Failed to fetch presentation content');
      }
      
      const content = await response.text();
      
      return NextResponse.json({
        content,
        expiresAt: expiresAtHeader,
      });
    } catch (error) {
      // If the blob doesn't exist, it will throw a 404
      if ((error as any)?.status === 404 || (error as Error).message.includes('not found')) {
        return NextResponse.json(
          { error: 'Presentation not found' },
          { status: 404 }
        );
      }
      throw error; // Re-throw for the outer catch
    }
  } catch (error) {
    console.error('Error fetching slide content:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 