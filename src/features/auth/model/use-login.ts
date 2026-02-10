import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api/base';

// 로그인 요청 시 사용하는 파라미터 타입
export interface LoginRequest {
  loginId: string;
  password: string;
}

// 로그인 성공 시 응답 데이터 타입
export interface LoginResponse {
  token: string;
}

// 로그인 요청을 위한 React Query mutation 훅
export const useLogin = () => {
  return useMutation({
    // 로그인 API 호출 함수
    mutationFn: async (credentials: LoginRequest) => {
      return await api.post<LoginResponse>('/api/login', credentials);
    },
  });
};