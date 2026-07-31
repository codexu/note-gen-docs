import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === '/cn' ||
    pathname.startsWith('/cn/') ||
    pathname === '/en' ||
    pathname.startsWith('/en/')
  ) {
    return NextResponse.next();
  }

  const preferredLanguage = request.headers
    .get('accept-language')
    ?.split(',', 1)[0]
    ?.trim()
    .toLowerCase();
  const language = preferredLanguage?.startsWith('zh') ? 'cn' : 'en';
  const url = request.nextUrl.clone();

  url.pathname = `/${language}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
