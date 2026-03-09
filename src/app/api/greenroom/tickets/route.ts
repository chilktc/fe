import { NextResponse } from "next/server";

/**
 * 입장권 생성 요청을 백엔드로 프록시하는 API Route
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";

    // 백엔드 입장권 생성 API로 요청 전달
    const response = await fetch(`${BACKEND_URL}/greenroom/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to create ticket" },
        { status: response.status },
      );
    }

    const nextResponse = NextResponse.json(data);

    return nextResponse;
  } catch (error) {
    console.error("Ticket proxy error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
