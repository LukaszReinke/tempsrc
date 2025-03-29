import { NextResponse } from 'next/server';
import { apiClient, authRequired } from '../apiClient';

export async function GET() {
  try {
    const user = await apiClient('profile', { method: 'GET', authRequired });
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching own data:', error);
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}

export async function PUT() {
  try {
    const user = await apiClient('profile', { method: 'PUT', authRequired });
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching own data:', error);
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}
