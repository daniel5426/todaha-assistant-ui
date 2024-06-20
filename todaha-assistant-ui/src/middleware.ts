import { NextResponse, type NextRequest } from 'next/server'
import { useAuthContext } from './states/auth';
import { isLoggedInShared } from './helpers/utils/shared';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('isLoggedIn')?.value;

  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (token === "false") {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}