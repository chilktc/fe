import { useEffect } from 'react';
import { api } from '@/shared/api/base';
import { useSessionStore } from '@/entities/session/model/store';

export function useSessionRestore() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  useEffect(() => {
    // 이미 인증된 상태라면 스킵
    if (isAuthenticated()) return;

    // 페이지 로드 시(혹은 앱 초기화 시) 사용자 정보를 요청하여
    // 1. Access Token이 있다면 정상 응답
    // 2. Access Token이 없다면 Interceptor가 401 감지 -> Refresh Token으로 갱신 시도 -> 성공 시 재요청 -> 성공
    // 3. Refresh Token도 없다면 최종 실패 (로그아웃 상태 유지)
    
    const restoreSession = async () => {
      try {
        // Access Token이 없는 상태에서 Refresh Token으로 세션 복구 시도
        // /api/refresh 엔드포인트는 쿠키(Refresh Token)를 사용하여 Access Token을 재발급함
        const response = await fetch('/api/refresh', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // 세션 복구 성공 = 로그인 상태로 전환 (쿠키 사용)
          useSessionStore.getState().setIsLoggedIn(true);
        }
      } catch (error) {
        // 세션 복구 실패 = 비로그인 상태
        console.log('Session restore failed or no session');
      }
    };

    restoreSession();
  }, [isAuthenticated]);
}