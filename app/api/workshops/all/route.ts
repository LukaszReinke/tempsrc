import { NextResponse, NextRequest } from 'next/server';
import { apiClient, authRequired } from '../../apiClient';
import { WorkshopsGetApiResponse } from '@hd/types';

export async function GET() {
  try {
    const workshops: WorkshopsGetApiResponse = await apiClient('workshops/all/', { method: 'GET', authRequired });
    return NextResponse.json(workshops);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 });
  }
}
