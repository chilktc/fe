"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSessionStore } from "@/entities/session/model/store";

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * 관리자 권한이 필요한 페이지에 접근하는 사용자를 검사하는 가드 컴포넌트
 */
export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { authStatus, user } = useSessionStore();

  const isAuthenticated = authStatus === "authenticated";
  const isBooting = authStatus === "booting";
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (isBooting) return;

    // 1. 로그인이 안 되어 있다면 관리자 로그인 페이지로 이동
    if (!isAuthenticated) {
      router.replace(
        `/admin/login?redirect_url=${encodeURIComponent(pathname)}`,
      );
      return;
    }

    // 2. 권한 체크: 관리자가 아니라면 에러와 함께 로그인 페이지로 리다이렉트
    if (!isAdmin) {
      router.replace("/admin/login?error=is_not_admin");
    }
  }, [isAuthenticated, isAdmin, isBooting, router, pathname]);

  // 로딩 중이거나 권한 확인 전이라면 로딩 표시
  if (isBooting || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
