import { NextResponse, NextRequest } from 'next/server';
import { apiClient, authRequired } from '../apiClient';
import { Workshop } from '@hd/types';

export async function GET() {
  try {
    const workshops: Workshop[] = await apiClient('workshops', { method: 'GET' });
    return NextResponse.json(workshops);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newContest = await apiClient('workshops', {
      method: 'POST',
      body: JSON.stringify(body),
      authRequired,
    });
    return NextResponse.json(newContest, { status: 201 })
  } catch (error) {
    console.error('Error creating workshop:', error);
    return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 });
  }
}
