"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/entities/session/model/store";

interface GuestGuardProps {
  children: React.ReactNode;
}

/**
 * 로그인이 된 사용자가 게스트 전용 페이지(로그인, 회원가입 등)에 접근하는 것을 방지하는 가드 컴포넌트
 */
export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const { isLoggedIn, isInitialized } = useSessionStore();

  useEffect(() => {
    // 초기 세션 확인이 끝났고, 로그인된 상태라면 홈으로 이동
    // TODO: firstLogin 확인 로직 추가
    if (isInitialized && isLoggedIn) {
      router.replace("/app");
    }
  }, [isLoggedIn, isInitialized, router]);

  // 세션 확인 중이거나 로그인된 상태라면 로딩 표시
  if (!isInitialized || isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
