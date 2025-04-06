import { NextRequest, NextResponse } from 'next/server';
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

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(JSON.stringify(body));

    const updatedUser = await apiClient('profile', {
      method: 'PUT',
      body: JSON.stringify(body),
      authRequired,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
