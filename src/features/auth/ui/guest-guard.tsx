"use client";

import { Navigate } from "react-router-dom";
import { useSessionStore } from "@/entities/session/model/store";

interface GuestGuardProps {
  children: React.ReactNode;
}

/**
 * 로그인이 된 사용자가 게스트 전용 페이지(로그인, 회원가입 등)에 접근하는 것을 방지하는 가드 컴포넌트
 */
export function GuestGuard({ children }: GuestGuardProps) {
  const { authStatus, user } = useSessionStore();
  const isAuthenticated =
    authStatus === "authenticated" && !!user?.id && !!user?.email;
  const isBooting = authStatus === "booting";

  // 세션 확인 중이거나 로그인된 상태라면 로딩 표시
  if (isBooting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={user?.firstLogin ? "/login/terms" : "/"} replace />;
  }

  return <>{children}</>;
}
