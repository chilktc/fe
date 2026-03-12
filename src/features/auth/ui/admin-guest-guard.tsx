"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/entities/session/model/store";

interface AdminGuestGuardProps {
  children: React.ReactNode;
}

/**
 * 관리자 로그인이 이미 되어 있는 사용자가 관리자 로그인 페이지에 접근하는 것을 방지하는 가드 컴포넌트
 */
export function AdminGuestGuard({ children }: AdminGuestGuardProps) {
  const router = useRouter();
  const { authStatus, user } = useSessionStore();

  const isAuthenticated = authStatus === "authenticated";
  const isBooting = authStatus === "booting";
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    // 이미 관리자로 로그인된 상태라면 관리자 메인 페이지로 이동
    if (isAuthenticated && isAdmin) {
      router.replace("/admin");
    }
  }, [isAuthenticated, isAdmin, router]);

  // 세션 확인 중이거나 이미 관리자로 로그인된 상태라면 로딩 표시
  if (isBooting || (isAuthenticated && isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
