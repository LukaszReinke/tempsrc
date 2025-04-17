import { NextResponse, NextRequest } from 'next/server';
import { apiClient } from '../apiClient';
import { Contest } from '@hd/types';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.toString();
    const contests: Contest[] = await apiClient(`contests/?${query}`, { method: 'GET' });
    return NextResponse.json(contests);
  } catch (error) {
    console.error('Error fetching contests:', error);
    return NextResponse.json({ error: 'Failed to fetch contests' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newContest = await apiClient('contests', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return NextResponse.json(newContest, { status: 201 });
  } catch (error) {
    console.error('Error creating contest:', error);
    return NextResponse.json({ error: 'Failed to create contest' }, { status: 500 });
  }
}
