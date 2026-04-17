import { useEffect } from "react";
import { useMe } from "@/features/auth";
import { usePathname } from "@/shared/lib/router";
import { useSessionStore } from "@/entities/session/model/store";

export function useSessionRestore() {
  const pathname = usePathname();
  const isOAuthCallback = pathname.startsWith("/oauth/callback/");
  const authStatus = useSessionStore((state) => state.authStatus);
  const { data: user, isFetched, isSuccess } = useMe(
    authStatus === "booting" && !isOAuthCallback,
  );

  useEffect(() => {
    if (authStatus !== "booting" || isOAuthCallback) return;
    if (!isFetched) return;

    if (isSuccess && user?.id && user?.email) {
      useSessionStore.getState().setUser(user);
    } else {
      useSessionStore.getState().clearSession();
    }
  }, [authStatus, isOAuthCallback, isFetched, isSuccess, user]);
}
