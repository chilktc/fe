import { NextRequest, NextResponse } from 'next/server';

// 구글 로그인 요청을 백엔드로 프록시하는 API Route
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('Google OAuth Error:', error);
    return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  try {
    const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8080';
    
    // 백엔드 구글 로그인 API로 인가코드 전달
    const response = await fetch(`${BACKEND_URL}/auth/oauth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Backend Login Failed:', response.status, errorData);

        let errorParam = 'backend_failed';
        if (response.status === 400 && errorData.code === 'CLIENT_ERROR') {
            errorParam = 'client_error';
        } else if (response.status === 401) {
            if (errorData.code === 'OAUTH_TOKEN_EXCHANGE_FAILED') errorParam = 'token_exchange_failed';
            if (errorData.code === 'OAUTH_USERINFO_FAILED') errorParam = 'user_info_failed';
        } else if (response.status === 403 && errorData.code === 'OAUTH_EMAIL_NOT_REGISTERED') {
            errorParam = 'email_not_registered';
        }

        return NextResponse.redirect(new URL(`/login?error=${errorParam}`, request.url));
    }

    const data = await response.json();
    const { accessToken, firstLogin } = data.data;

    // Access Token을 URL query param으로 넘겨서 프론트엔드에서 처리하도록 함
    const redirectUrl = new URL('/', request.url);
    if (accessToken) {
        redirectUrl.searchParams.set('accessToken', accessToken);
    }
    if (firstLogin) {
        redirectUrl.searchParams.set('firstLogin', 'true');
    }
    
    const nextResponse = NextResponse.redirect(redirectUrl);

    // 백엔드에서 받은 쿠키를 클라이언트로 전달
    const setCookies = response.headers.getSetCookie();
    setCookies.forEach(cookie => {
      nextResponse.headers.append('Set-Cookie', cookie);
    });
    
    return nextResponse;

  } catch (err) {
    console.error('OAuth Callback Error:', err);
    return NextResponse.redirect(new URL('/login?error=server_error', request.url));
  }
}
