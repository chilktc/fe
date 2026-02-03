import { NextResponse } from 'next/server';

// 로그인 요청을 백엔드로 프록시하는 API Route
export async function POST(request: Request) {
  try {
    // 프론트에서 전달된 로그인 요청 바디 파싱
    const body = await request.json();
    const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8080';
    
    // 백엔드 로그인 API로 요청 전달
    const response = await fetch(`${BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    const nextResponse = NextResponse.json(data);

    // 백엔드에서 받은 쿠키를 클라이언트로 전달
    const setCookies = response.headers.getSetCookie();
    setCookies.forEach(cookie => {
      nextResponse.headers.append('Set-Cookie', cookie);
    });
    
    return nextResponse;
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
