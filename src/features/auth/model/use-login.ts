import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/base";

export interface LoginRequest {
  loginId: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return await api.post("/auth/login", credentials);
    },
  });
};
