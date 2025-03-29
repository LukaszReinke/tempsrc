import { NextResponse, NextRequest } from 'next/server';
import { ACCESS_TOKEN_KEY, ROUTES } from '@hd/consts';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const baseUrl = req.nextUrl.origin;

  if (pathname.startsWith(ROUTES.SIGN_IN) || pathname.startsWith(ROUTES.RESET_PASSWORD)) {
    if (accessToken) {
      return NextResponse.redirect(new URL(ROUTES.CREW_DASHBOARD, baseUrl));
    }
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, baseUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/crew/:path*', '/login'], // Add protected routes here
};
