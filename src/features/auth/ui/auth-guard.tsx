'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSessionStore } from '@/entities/session/model/store';

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
  const { isLoggedIn, isInitialized } = useSessionStore();

  useEffect(() => {
    // 세션 확인이 끝났는데 로그인이 안 되어 있다면 로그인 페이지로 이동
    if (isInitialized && !isLoggedIn) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [isLoggedIn, isInitialized, router, pathname]);

  // 세션 확인 중이거나 로그인이 안 된 상태라면 로딩 표시
  if (!isInitialized || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
