"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSessionStore } from "@/entities/session/model/store";
import { useMe } from "@/entities/user/api/use-me";

const sanitizeRedirectUrl = (value: string | null) => {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
};

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAccessToken = useSessionStore((state) => state.setAccessToken);
  const setUser = useSessionStore((state) => state.setUser);
  const clearSession = useSessionStore((state) => state.clearSession);
  const isFetched = useRef(false);
  const { refetch: refetchMe } = useMe(false);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const redirectUrl = sanitizeRedirectUrl(searchParams.get("state"));

    const failAuth = (errorCode: string) => {
      clearSession();
      router.replace(`/login?error=${errorCode}`);
    };

    if (error) {
      failAuth("oauth_failed");
      return;
    }

    if (!code) {
      failAuth("no_code");
      return;
    }

    const fetchToken = async () => {
      try {
        const response = await fetch("/api/oauth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          failAuth("login_failed");
          return;
        }

        const result = await response.json();
        const accessToken = result.data?.accessToken;

        if (!accessToken) {
          failAuth("login_failed");
          return;
        }

        setAccessToken(accessToken);

        const meResult = await refetchMe();

        if (!meResult.data) {
          failAuth("profile_failed");
          return;
        }

        const user = meResult.data;
        setUser(user);

        if (user.firstLogin) {
          router.replace(
            `/login/terms?redirect_url=${encodeURIComponent(redirectUrl)}`,
          );
        } else {
          router.replace(redirectUrl);
        }
      } catch (err) {
        console.error("Token exchange error:", err);
        failAuth("server_error");
      }
    };

    fetchToken();
  }, [
    searchParams,
    router,
    setAccessToken,
    setUser,
    clearSession,
    refetchMe,
  ]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="text-gray-500">로그인 중...</div>
    </div>
  );
}
