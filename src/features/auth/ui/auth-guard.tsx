"use client";

import { Navigate } from "react-router-dom";
import { usePathname } from "@/shared/lib/router";
import { useSessionStore } from "@/entities/session/model/store";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * 인증이 필요한 페이지에 접근하는 사용자를 검사하는 가드 컴포넌트
 * 로그인이 되어 있지 않다면 /login 페이지로 리다이렉트
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const { authStatus, user } = useSessionStore();

  const isTermsPage = pathname === "/login/terms";
  const isLoginPage = pathname === "/login";
  const hasValidUser = !!user?.id && !!user?.email;
  const isAuthenticated = authStatus === "authenticated" && hasValidUser;
  const isBooting = authStatus === "booting";

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
        to={`/login?redirect_url=${encodeURIComponent(pathname)}`}
        replace
      />
    );
  }

  const isSubAdminPage = pathname.startsWith("/admin");

  if (hasValidUser && user.firstLogin && !isSubAdminPage && !isTermsPage) {
    return <Navigate to="/login/terms" replace />;
  }

  if (hasValidUser && !user.firstLogin && (isLoginPage || isTermsPage)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
