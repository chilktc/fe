"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { useSessionRestore } from "@/features/auth/model/use-session-restore";
import { useSessionStore } from "@/entities/session/model/store";
import { usePathname } from "@/shared/lib/router";

function AuthInitializer() {
  useSessionRestore();
  return null;
}

function SessionBootstrap({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const authStatus = useSessionStore((state) => state.authStatus);
  const isOAuthCallback = pathname.startsWith("/oauth/callback/");

  if (authStatus === "booting" && !isOAuthCallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      <SessionBootstrap>{children}</SessionBootstrap>
    </QueryClientProvider>
  );
}
