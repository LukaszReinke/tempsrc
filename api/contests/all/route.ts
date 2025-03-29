import { NextResponse } from 'next/server';
import { apiClient } from '../../apiClient';

const authRequired = true;

export async function GET() {
  try {
    const contests = await apiClient('contests/all/', { method: 'GET', authRequired });
    return NextResponse.json(contests);
  } catch (error) {
    console.error('Error fetching contests:', error);
    return NextResponse.json({ error: 'Failed to fetch contests' }, { status: 500 });
  }
}