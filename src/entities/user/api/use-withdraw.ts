import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSessionStore } from "@/entities/session/model/store";
import { useRouter } from "next/navigation";
import { api } from "@/shared/api/base";

export function useWithdraw() {
  const queryClient = useQueryClient();
  const clearSession = useSessionStore((state) => state.clearSession);
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return api.post("/api/auth/withdraw");
    },
    onSettled: () => {
      // 1. React Query 캐시 초기화
      queryClient.clear();

      // 2. 세션 스토어 초기화
      clearSession();

      // 3. 로그인 페이지로 강제 이동 (AuthGuard의 리다이렉트 파라미터를 피하기 위함)
      window.location.href = "/login";
    },
  });
}
