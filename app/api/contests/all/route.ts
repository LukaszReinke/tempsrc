import { NextResponse, NextRequest } from 'next/server';
import { apiClient, authRequired } from '../../apiClient';
import { ContestsGetApiResponse } from '@hd/types';

export async function GET() {
  try {
    const contests: ContestsGetApiResponse = await apiClient('contests/all/', { method: 'GET', authRequired });
    return NextResponse.json(contests);
  } catch (error) {
    console.error('Error fetching contests:', error);
    return NextResponse.json({ error: 'Failed to fetch contests' }, { status: 500 });
  }
}