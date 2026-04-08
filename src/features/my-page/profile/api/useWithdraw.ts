import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSessionStore } from "@/entities/session/model/store";
import { api } from "@/shared/api/base";

export function useWithdraw() {
  const queryClient = useQueryClient();
  const clearSession = useSessionStore((state) => state.clearSession);

  return useMutation({
    mutationFn: async () => {
      return api.delete("/auth/withdraw");
    },
    onSettled: () => {
      queryClient.clear();
      clearSession();
      window.location.href = "/login";
    },
  });
}
