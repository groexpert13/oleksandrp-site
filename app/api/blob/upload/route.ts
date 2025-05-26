import { put, type PutBlobResult } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pathname = 'articles/blob.txt', content = 'Hello World!' } = (await request.json()) as {
      pathname?: string;
      content?: string;
    };

    // Get the read-write token from environment variables
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      throw new Error('Missing BLOB_READ_WRITE_TOKEN environment variable');
    }

    // Upload the blob
    const blob: PutBlobResult = await put(pathname, content, {
      access: 'public',
      token,
    });

    // Return the public URL to the client
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 