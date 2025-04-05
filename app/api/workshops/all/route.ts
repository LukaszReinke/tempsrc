import { NextResponse, NextRequest } from 'next/server';
import { apiClient } from '../../apiClient';
import { WorkshopApiResponse } from '@hd/types';

const authRequired = true;

export async function GET() {
  try {
    const workshops: WorkshopApiResponse = await apiClient('workshops/all/', { method: 'GET', authRequired });
    return NextResponse.json(workshops);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newWorkshop = await apiClient('workshops', {
      method: 'POST',
      body: JSON.stringify(body),
      authRequired,
    });
    return NextResponse.json(newWorkshop, { status: 200 });
  } catch (error) {
    console.error('Error creating workshop:', error);
    return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 });
  }
}