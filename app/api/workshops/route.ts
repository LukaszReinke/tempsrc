import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '../apiClient';
import { Workshop } from '@hd/types';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.toString();
    const workshops: Workshop[] = await apiClient(`workshops/?${query}`, { method: 'GET' });
    return NextResponse.json(workshops);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newWorkshop = await apiClient('workshops', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return NextResponse.json(newWorkshop, { status: 201 });
  } catch (error) {
    console.error('Error on workshop POST:', error);
    return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 });
  }
}
