import { NextResponse, NextRequest } from 'next/server';
import { apiClient, authRequired } from '../../apiClient';
import { ContestsGetApiResponse } from '@hd/types';

export async function GET(req: NextRequest) {
  try {
    const queryString = req.nextUrl.searchParams.toString();
    const url = `contests/all/?${queryString}`;

    const contests: ContestsGetApiResponse = await apiClient(url, { method: 'GET', authRequired });
    return NextResponse.json(contests);
  } catch (error) {
    console.error('Error fetching contests:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch contests',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
