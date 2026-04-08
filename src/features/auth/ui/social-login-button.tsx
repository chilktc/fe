"use client";

import { Button } from "@/shared/ui";
import { GoogleIcon } from "@/shared/icons/google-icon";
import { useQueryParams } from "@/shared/lib/router";

const sanitizeRedirectUrl = (value: string | null, fallbackUrl: string) => {
  if (!value) return fallbackUrl;
  if (!value.startsWith("/") || value.startsWith("//")) return fallbackUrl;
  return value;
};

export function SocialLoginButton({
  className,
  fallbackUrl = "/",
}: {
  className?: string;
  fallbackUrl?: string;
}) {
  const searchParams = useQueryParams();

  const redirectUrl = sanitizeRedirectUrl(
    searchParams.get("redirect_url") || searchParams.get("redirect"),
    fallbackUrl,
  );

  const handleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      console.error("Google OAuth environment variables are missing.");
      return;
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      state: redirectUrl,
      scope: "email profile openid",
      access_type: "offline",
      prompt: "consent",
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <div className={`w-full py-4 px-6 ${className}`}>
      <Button className="gap-2 w-full" onClick={handleLogin}>
        <GoogleIcon />
        Google로 계속하기
      </Button>
    </div>
  );
}
