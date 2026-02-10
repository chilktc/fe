import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/shared/api/base';
import { useSessionStore } from '@/entities/session/model/store';

export const useLogout = () => {
  const router = useRouter();
  const clearSession = useSessionStore((state) => state.clearSession);

  return useMutation({
    mutationFn: async () => {
      await api.post('/api/logout');
    },
    onSuccess: () => {
      clearSession();
      router.push('/login');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // 강제 로그아웃
      clearSession();
      router.push('/login');
    }
  });
};
