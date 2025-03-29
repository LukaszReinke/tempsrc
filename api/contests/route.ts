import { NextResponse } from 'next/server';
import { apiClient } from '../apiClient';
import { Contest } from '@hd/types';

export async function GET() {
  try {
    const contests: Contest[] = await apiClient('contest', { method: 'GET' });
    return NextResponse.json(contests);
  } catch (error) {
    console.error('Error fetching contests:', error);
    return NextResponse.json({ error: 'Failed to fetch contests' }, { status: 500 });
  }
}
