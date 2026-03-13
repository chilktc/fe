import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8081";
  const authHeader = request.headers.get("authorization");

  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/admin/users/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error(
        `Backend POST /admin/users failed: ${response.status}`,
        errorText,
      );
      return NextResponse.json(
        {
          success: false,
          message:
            JSON.parse(errorText).message || "사용자 초대에 실패했습니다.",
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "초대 메일이 발송되었습니다.",
    });
  } catch (error) {
    console.error("POST /api/admin/users proxy error:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
