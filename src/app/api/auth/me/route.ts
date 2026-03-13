import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";
    const authHeader = request.headers.get("authorization");

    // 백엔드 사용자 정보 API로 요청 전달
    const response = await fetch(`${BACKEND_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { "Authorization": authHeader }),
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error(`Backend /auth/me failed: ${response.status}`, errorText);

      return NextResponse.json(
        { message: "Failed to fetch user profile" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const userData = data.data || data;
    const mockedUser = {
      ...userData,
      role: userData.email === "chilktc.admin@gmail.com" ? "ADMIN" : "USER",
    };
    return NextResponse.json(mockedUser);
  } catch (error) {
    console.error("User profile fetch proxy error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
