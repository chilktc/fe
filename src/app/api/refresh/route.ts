import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8080';
    const cookies = request.headers.get('cookie');
    
    // 백엔드 리프레시 API로 요청 전달
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookies && { 'Cookie': cookies }),
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Refresh failed' },
        { status: response.status }
      );
    }

    const nextResponse = NextResponse.json(data);

    const setCookies = response.headers.getSetCookie();
    setCookies.forEach(cookie => {
      nextResponse.headers.append('Set-Cookie', cookie);
    });

    return nextResponse;
  } catch (error) {
    console.error('Refresh proxy error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}