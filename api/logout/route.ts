import { ACCESS_TOKEN_KEY, ROUTES } from '@hd/consts';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ACCESS_TOKEN_KEY, '', {
    path: ROUTES.HOME,
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return response;
}
