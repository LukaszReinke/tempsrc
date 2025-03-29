import { NextResponse } from 'next/server';
import { ACCESS_TOKEN_KEY } from '@hd/consts';
import { apiClient } from '@hd/app/api/apiClient';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const externalData = await apiClient('login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!externalData.access_token) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const accessToken = externalData.access_token;

    const response = NextResponse.json({
      message: 'Login successful',
      user: externalData.user,
    });

    response.cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 1800, // 30 minutes
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
