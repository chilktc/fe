import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSessionStore } from "@/entities/session/model/store";
import { useMe } from "@/entities/user/api/use-me";

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

    if (isSuccess && user) {
      useSessionStore.getState().setUser(user);
    } else {
      console.log("Session restore failed or no session");
      useSessionStore.getState().clearSession();
    }
  }, [authStatus, isOAuthCallback, isFetched, isSuccess, user]);
}
