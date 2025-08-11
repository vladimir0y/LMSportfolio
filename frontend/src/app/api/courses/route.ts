import { NextResponse } from 'next/server';

export async function GET() {
  // Fallback sample data if no external API is configured
  return NextResponse.json([
    { id: 'sample-1', title: 'Sample Course 1', description: 'Demo course', isPublished: true },
    { id: 'sample-2', title: 'Sample Course 2', description: 'Demo course', isPublished: true },
  ]);
}

export async function POST() {
  return new NextResponse('Not implemented in frontend mock', { status: 405 });
}


