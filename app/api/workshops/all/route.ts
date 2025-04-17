import { NextResponse, NextRequest } from 'next/server';
import { apiClient, authRequired } from '../../apiClient';
import { WorkshopsGetApiResponse } from '@hd/types';

export async function GET(req: NextRequest) {
  try {
    const queryString = req.nextUrl.searchParams.toString();
    const url = `workshops/all/?${queryString}`;
    
    const workshops: WorkshopsGetApiResponse = await apiClient(url, { method: 'GET', authRequired });
    return NextResponse.json(workshops);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch workshops',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
