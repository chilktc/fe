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
        const response = await fetch('/api/auth/me', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const user = await response.json();
          useSessionStore.getState().setUser(user);
        } else {
          useSessionStore.getState().setIsLoggedIn(false);
        }
      } catch (error) {
        console.log('Session restore failed or no session');
        useSessionStore.getState().setIsLoggedIn(false);
      } finally {
        // 성공하든 실패하든 초기 세션 확인은 끝났음을 알림
        useSessionStore.getState().setIsInitialized(true);
      }
    };

    restoreSession();
  }, [isAuthenticated]);
}