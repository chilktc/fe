import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hasAccess = request.cookies.has('accessToken');
  const hasRefresh = request.cookies.has('refreshToken');

  if (hasAccess || hasRefresh) {
    // 이미 로그인된 상태라면 메인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: ['/login', '/signup'],
};