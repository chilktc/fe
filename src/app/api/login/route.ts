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

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json(
            { message: errorData.message || 'Login failed' },
            { status: response.status }
        );
    }

    const data = await response.json();

    // TODO: 쿠키 처리 로직 추가
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
