import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";
  const authHeader = request.headers.get("authorization");
  const requestCookies = request.headers.get("cookie") || "";

  let backendSuccess = false;

  try {
    // 1. Spring 백엔드에 로그아웃 요청 (Best-effort)
    const response = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { "Authorization": authHeader }),
        ...(requestCookies && { "Cookie": requestCookies }),
      },
    });

    if (response.ok) {
      backendSuccess = true;
    } else {
      const errorText = await response.text().catch(() => "");
      console.error(
        `Backend /auth/logout failed: ${response.status}`,
        errorText,
      );
    }
  } catch (error) {
    console.error("Backend /auth/logout fetch proxy error:", error);
  }

  // 2. 세션 정리 (성공 여부와 상관없이 수행)
  const response = NextResponse.json({
    success: true,
    backendSynced: backendSuccess,
    message: backendSuccess
      ? "Logged out and session cleared."
      : "Session cleared, but backend sync failed.",
  });

  // refreshToken 쿠키 삭제 (Path를 /api/refresh로 명시)
  response.cookies.set("refreshToken", "", {
    path: "/api/refresh",
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
