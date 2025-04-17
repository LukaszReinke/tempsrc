import { NextRequest, NextResponse } from 'next/server';
import { apiClient, authRequired } from '../../apiClient';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ contest_id: string }> },
) {
  const { contest_id } = await params;
  if (!contest_id) {
    return NextResponse.json({ error: 'Contest ID is required' }, { status: 400 });
  }
  try {
    const contest = await apiClient(`contests/${contest_id}`, { method: 'GET', authRequired });
    return NextResponse.json(contest);
  } catch (error) {
    console.error('Error fetching contest:', error);
    return NextResponse.json({ error: 'Contest not found' }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ contest_id: string }> },
) {
  const { contest_id } = await params;
  if (!contest_id) {
    return NextResponse.json({ error: 'Contest ID is required' }, { status: 400 });
  }

  try {
    const body = await req.json();

    const updatedContest = await apiClient(`contests/${contest_id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      authRequired,
    });
    return NextResponse.json(updatedContest);
  } catch (error) {
    console.error('Error updating contest:', error);
    return NextResponse.json({ error: 'Failed to update contest' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ contest_id: string }> },
) {
  const { contest_id } = await params;
  if (!contest_id) {
    return NextResponse.json({ error: 'Contest ID is required' }, { status: 400 });
  }

  try {
    await apiClient(`contests/${contest_id}`, { method: 'DELETE', authRequired });
    return NextResponse.json({ message: 'Contest deleted successfully' });
  } catch (error) {
    console.error('Error deleting contest:', error);
    return NextResponse.json({ error: 'Failed to delete contest' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ contest_id: string }> },
) {
  const { contest_id } = await params;
  if (!contest_id) {
    return NextResponse.json({ error: 'Contest ID is required' }, { status: 400 });
  }
  try {
    const contest = await apiClient(`contests/${contest_id}/approve`, {
      method: 'PATCH',
      authRequired,
    });
    return NextResponse.json(contest);
  } catch (error) {
    console.error('Error fetching contest:', error);
    return NextResponse.json({ error: 'Failed to approve contest' }, { status: 404 });
  }
}
