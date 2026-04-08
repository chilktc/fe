import { useMutation } from "@tanstack/react-query";
import { useAppRouter } from "@/shared/lib/router";
import { api } from "@/shared/api/base";
import { useSessionStore } from "@/entities/session/model/store";

export const useLogout = () => {
  const router = useAppRouter();
  const clearSession = useSessionStore((state) => state.clearSession);

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      clearSession();
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      clearSession();
      router.push("/login");
    },
  });
};
