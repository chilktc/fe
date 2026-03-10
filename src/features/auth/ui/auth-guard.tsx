"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSessionStore } from "@/entities/session/model/store";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * 인증이 필요한 페이지에 접근하는 사용자를 검사하는 가드 컴포넌트
 * 로그인이 되어 있지 않다면 /login 페이지로 리다이렉트
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { authStatus, user } = useSessionStore();

  const isTermsPage = pathname === "/login/terms";
  const isLoginPage = pathname === "/login";
  const isAuthenticated = authStatus === "authenticated";
  const isBooting = authStatus === "booting";

  useEffect(() => {
    if (isBooting) return;

    // 1. 로그인이 안 되어 있다면 로그인 페이지로 이동
    if (!isAuthenticated) {
      if (!isLoginPage) {
        router.replace(`/login?redirect_url=${encodeURIComponent(pathname)}`);
      }
      return;
    }

    if (user?.firstLogin) {
      // 2. 최초 로그인 사용자: 약관 페이지로 무조건 이동
      if (!isTermsPage) {
        router.replace("/login/terms");
      }
    } else {
      // 3. 기존 사용자 (firstLogin === false)
      // 로그인/약관 페이지 접근 시 홈(/)으로 리다이렉트
      if (isLoginPage || isTermsPage) {
        router.replace("/");
      }
    }
  }, [isAuthenticated, isBooting, user, router, pathname, isLoginPage, isTermsPage]);

  // 리다이렉트가 필요한 상황이라면 로딩 표시 유지
  let isRedirectNeeded = false;
  if (!isAuthenticated && !isLoginPage) {
    isRedirectNeeded = true;
  } else if (isAuthenticated) {
    if (user?.firstLogin && !isTermsPage) {
      isRedirectNeeded = true;
    } else if (!user?.firstLogin && (isLoginPage || isTermsPage)) {
      isRedirectNeeded = true;
    }
  }

  if (isBooting || !isAuthenticated || isRedirectNeeded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
