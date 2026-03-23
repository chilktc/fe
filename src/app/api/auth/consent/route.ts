import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8080";
  const authHeader = request.headers.get("authorization");

  try {
    const body = await request.json();

    // 사용자가 입력한 동의 항목 외에 백엔드에서 요구하는 agreedPrivacy: true 를 추가/매핑
    const payload = {
      ...body,
      agreedPrivacy: true,
    };

    const response = await fetch(`${BACKEND_URL}/auth/consent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error(
        `Backend POST /auth/consent failed: ${response.status}`,
        errorText,
      );
      return NextResponse.json(
        {
          success: false,
          message:
            (errorText && JSON.parse(errorText).message) ||
            "약관 동의 처리에 실패했습니다.",
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "약관 동의가 완료되었습니다.",
    });
  } catch (error) {
    console.error("POST /api/auth/consent proxy error:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
