import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '../../apiClient';

const authRequired = true;

export async function GET(req: NextRequest, { params }: { params: Promise<{ user_id: string }> }) {
  const { user_id } = await params;
  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  try {
    const user = await apiClient(`users/${user_id}`, { method: 'GET', authRequired });
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ user_id: string }> }) {
  const { user_id } = await params;
  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const body = await req.json();

    const updatedUser = await apiClient(`users/${user_id}/update`, {
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> },
) {
  const { user_id } = await params;
  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    await apiClient(`users/${user_id}`, { method: 'DELETE', authRequired });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
