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

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await apiClient('workshops', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const response = NextResponse.json({
      message: 'Workshop successfully reported',
    });

    return response;
  } catch (error) {
    console.error('Error on workshop POST:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
