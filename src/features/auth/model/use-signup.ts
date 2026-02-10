import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api/base';
import { LoginRequest } from './use-login';

export type SignupRequest = LoginRequest;

export interface SignupResponse {
  message: string;
}

export const useSignup = () => {
  return useMutation({
    mutationFn: async (credentials: SignupRequest) => {
      return await api.post<SignupResponse>('/api/signup', credentials);
    },
  });
};
