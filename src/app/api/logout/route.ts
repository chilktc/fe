import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8080';
  
  try {
    // 백엔드에 로그아웃 요청
    const backendResponse = await fetch(`${BACKEND_URL}/api/logout`, { 
      method: 'POST',
      headers: {
        'Cookie': request.headers.get('cookie') || '',
      },
    });

    const nextResponse = NextResponse.json({ 
      message: 'Logged out successfully' 
    });

    // 백엔드에서 받은 쿠키를 클라이언트로 전달 (쿠키 삭제 포함)
    const setCookies = backendResponse.headers.getSetCookie();
    setCookies.forEach(cookie => {
      nextResponse.headers.append('Set-Cookie', cookie);
    });
    
    return nextResponse;
  } catch (error) {
    console.error('Logout failed:', error);
    // 백엔드 실패 시에도 프론트엔드에서 쿠키 삭제
    const response = NextResponse.json(
      { message: 'Logout failed' },
      { status: 500 }
    );
    response.cookies.delete('refreshToken');
    return response;
  }
}