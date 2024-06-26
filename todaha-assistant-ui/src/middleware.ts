import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

// Internationalization middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'he'],
  defaultLocale: 'he'
});

// Authentication middleware
export function middleware(request: NextRequest) {
  const token = request.cookies.get('loggedIn')?.value;

  // Handle internationalized routes first
  // Custom authentication logic
  if (request.nextUrl.pathname.includes('/admin/dashboard')) {
    if (token === "false") {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return intlMiddleware(request);
}

// Configuration for the combined middleware
export const config = {
  matcher: [
    '/',
    '/(de|en)/:path*',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ]
};
