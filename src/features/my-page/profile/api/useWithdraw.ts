import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSessionStore } from "@/entities/session/model/store";
import { api } from "@/shared/api/base";

interface WithdrawPayload {
  email: string;
}

export function useWithdraw() {
  const queryClient = useQueryClient();
  const clearSession = useSessionStore((state) => state.clearSession);

  return useMutation({
    mutationFn: async ({ email }: WithdrawPayload) => {
      return api.delete("/users/me", {
        data: { email },
      });
    },
    onSettled: () => {
      queryClient.clear();
      clearSession();
      window.location.href = "/login";
    },
  });
}
