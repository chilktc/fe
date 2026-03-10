import { NextResponse } from "next/server";

export async function GET() {
  const { GOOGLE_CLIENT_ID, NEXT_PUBLIC_GOOGLE_REDIRECT_URI } = process.env;

  if (!GOOGLE_CLIENT_ID || !NEXT_PUBLIC_GOOGLE_REDIRECT_URI) {
    return NextResponse.json(
      { message: "Google OAuth Environment variables are missing" },
      { status: 500 },
    );
  }

  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "email profile openid",
    access_type: "offline", // Refresh Token을 받기 위해 필요할 수 있음
    prompt: "consent", // 항상 동의 화면 노출 (선택사항)
  });

  const googleAuthUrl = `${baseUrl}?${params.toString()}`;

  return NextResponse.redirect(googleAuthUrl);
}
