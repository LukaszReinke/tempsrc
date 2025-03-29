import { NextResponse } from 'next/server';
import { apiClient } from '../apiClient';
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
