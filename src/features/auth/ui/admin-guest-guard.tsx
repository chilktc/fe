"use client";

import { Navigate } from "react-router-dom";
import { useSessionStore } from "@/entities/session/model/store";

interface AdminGuestGuardProps {
  children: React.ReactNode;
}

/**
 * 관리자 로그인이 이미 되어 있는 사용자가 관리자 로그인 페이지에 접근하는 것을 방지하는 가드 컴포넌트
 */
export function AdminGuestGuard({ children }: AdminGuestGuardProps) {
  const { authStatus, user } = useSessionStore();

  const isAuthenticated =
    authStatus === "authenticated" && !!user?.id && !!user?.email;
  const isBooting = authStatus === "booting";
  const isAdmin = user?.role === "ADMIN";

  if (isBooting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
