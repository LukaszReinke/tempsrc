import { NextResponse } from 'next/server';
import { apiClient } from '../../apiClient';

const authRequired = true;

export async function GET() {
  try {
    const workshops = await apiClient('workshops/all/', { method: 'GET', authRequired });
    return NextResponse.json(workshops);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 });
  }
}