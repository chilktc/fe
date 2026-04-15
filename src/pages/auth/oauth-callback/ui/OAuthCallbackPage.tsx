import { Suspense, useEffect, useRef } from "react";
import { useSessionStore } from "@/entities/session/model/store";
import { useMe } from "@/features/auth";
import { AUTH_ERROR_MESSAGES } from "@/features/auth/model/constants";
import { useAppRouter, useQueryParams } from "@/shared/lib/router";
import { PageLoading } from "@/shared/ui";

interface OAuthLoginResponse {
  code?: string;
  message?: string;
  data?: {
    accessToken?: string;
  };
}

function getOAuthErrorCode(code?: string) {
  if (code && code in AUTH_ERROR_MESSAGES) {
    return code;
  }

  return "server_error";
}

function sanitizeRedirectUrl(value: string | null) {
  if (!value) {
    return "/";
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}

function GoogleCallbackContent() {
  const router = useAppRouter();
  const searchParams = useQueryParams();
  const setAccessToken = useSessionStore((state) => state.setAccessToken);
  const setUser = useSessionStore((state) => state.setUser);
  const clearSession = useSessionStore((state) => state.clearSession);
  const didRequest = useRef(false);
  const { refetch: refetchMe } = useMe(false);

  useEffect(() => {
    if (didRequest.current) {
      return;
    }

    didRequest.current = true;

    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const redirectUrl = sanitizeRedirectUrl(searchParams.get("state"));
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

    const failAuth = (errorCode: string) => {
      clearSession();
      router.replace(`/login?error=${errorCode}`);
    };

    if (error) {
      failAuth("server_error");
      return;
    }

    if (!code) {
      failAuth("server_error");
      return;
    }

    void (async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/auth/oauth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code }),
        });

        const result = (await response.json().catch(() => null)) as
          | OAuthLoginResponse
          | null;

        if (!response.ok) {
          failAuth(getOAuthErrorCode(result?.code));
          return;
        }

        const accessToken = result?.data?.accessToken;

        if (!accessToken) {
          failAuth("server_error");
          return;
        }

        setAccessToken(accessToken);

        const meResult = await refetchMe();

        if (!meResult.data) {
          failAuth("server_error");
          return;
        }

        setUser(meResult.data);

        if (meResult.data.firstLogin && !redirectUrl.startsWith("/admin")) {
          router.replace(
            `/login/terms?redirect_url=${encodeURIComponent(redirectUrl)}`,
          );
          return;
        }

        router.replace(redirectUrl);
      } catch (error) {
        console.error("Token exchange error:", error);
        failAuth("server_error");
      }
    })();
  }, [clearSession, refetchMe, router, searchParams, setAccessToken, setUser]);

  return <PageLoading label="로그인 중..." className="bg-gray-100 w-full" />;
}

export function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <PageLoading label="로그인 중..." className="bg-gray-100 w-full" />
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
