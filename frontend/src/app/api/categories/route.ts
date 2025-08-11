import { NextResponse } from 'next/server';

export async function GET() {
  // Sample categories data
  return NextResponse.json([
    { id: '1', name: 'Programming' },
    { id: '2', name: 'Design' },
    { id: '3', name: 'Business' },
    { id: '4', name: 'Marketing' },
    { id: '5', name: 'Technology' }
  ]);
}
