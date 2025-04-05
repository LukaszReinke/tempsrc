import { NextRequest, NextResponse } from 'next/server';
import { apiClient, authRequired } from '../apiClient';

export async function GET() {
  try {
    const users = await apiClient('users', { method: 'GET', authRequired });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newUser = await apiClient('users', {
      method: 'POST',
      body: JSON.stringify(body),
      authRequired,
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
