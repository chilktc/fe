import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "no_code" }, { status: 400 });
    }

    const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";

    const response = await fetch(`${BACKEND_URL}/auth/oauth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "backend_failed", details: errorData },
        { status: response.status },
      );
    }

    const data = await response.json();

    const nextResponse = NextResponse.json(data);

    const setCookies = response.headers.getSetCookie();
    setCookies.forEach((cookie) => {
      nextResponse.headers.append("Set-Cookie", cookie);
    });

    return nextResponse;
  } catch (err) {
    console.error("OAuth Login API Error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
