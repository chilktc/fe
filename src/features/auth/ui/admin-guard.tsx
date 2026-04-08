"use client";

import { Navigate } from "react-router-dom";
import { usePathname } from "@/shared/lib/router";
import { useSessionStore } from "@/entities/session/model/store";

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * 관리자 권한이 필요한 페이지에 접근하는 사용자를 검사하는 가드 컴포넌트
 */
export function AdminGuard({ children }: AdminGuardProps) {
  const pathname = usePathname();
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

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/admin/login?redirect_url=${encodeURIComponent(pathname)}`}
        replace
      />
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login?error=is_not_admin" replace />;
  }

  return <>{children}</>;
}
