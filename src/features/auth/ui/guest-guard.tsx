'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/entities/session/model/store';

interface GuestGuardProps {
  children: React.ReactNode;
}

/**
 * 로그인이 된 사용자가 게스트 전용 페이지(로그인, 회원가입 등)에 접근하는 것을 방지하는 가드 컴포넌트입니다.
 * 2차 방어(클라이언트 사이드) 역할을 수행합니다.
 */
export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const isLoggedIn = useSessionStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  // 로그인 상태라면 아무것도 렌더링하지 않음 (리다이렉트 중)
  if (isLoggedIn) return null;

  return <>{children}</>;
}
