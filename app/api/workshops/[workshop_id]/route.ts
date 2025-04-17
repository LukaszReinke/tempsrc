import { NextRequest, NextResponse } from 'next/server';
import { apiClient, authRequired } from '../../apiClient';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ workshop_id: string }> },
) {
  const { workshop_id } = await params;
  if (!workshop_id) {
    return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 });
  }
  try {
    const workshop = await apiClient(`workshops/${workshop_id}`, { method: 'GET', authRequired });
    return NextResponse.json(workshop);
  } catch (error) {
    console.error('Error fetching workshop:', error);
    return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ workshop_id: string }> },
) {
  const { workshop_id } = await params;
  if (!workshop_id) {
    return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 });
  }

  try {
    const body = await req.json();

    const updatedWorkshop = await apiClient(`workshops/${workshop_id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      authRequired,
    });
    return NextResponse.json(updatedWorkshop);
  } catch (error) {
    console.error('Error updating workshop:', error);
    return NextResponse.json({ error: 'Failed to update workshop' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ workshop_id: string }> },
) {
  const { workshop_id } = await params;
  if (!workshop_id) {
    return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 });
  }

  try {
    await apiClient(`workshops/${workshop_id}`, { method: 'DELETE', authRequired });
    return NextResponse.json({ message: 'Workshop deleted successfully' });
  } catch (error) {
    console.error('Error deleting workshop:', error);
    return NextResponse.json({ error: 'Failed to delete workshop' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ workshop_id: string }> },
) {
  const { workshop_id } = await params;
  if (!workshop_id) {
    return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 });
  }
  try {
    const workshop = await apiClient(`workshops/${workshop_id}/approve`, {
      method: 'PATCH',
      authRequired,
    });
    return NextResponse.json(workshop);
  } catch (error) {
    console.error('Error fetching workshop:', error);
    return NextResponse.json({ error: 'Failed to approve workshop' }, { status: 404 });
  }
}
