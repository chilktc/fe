"use client";

import { Button } from "@/shared/ui";
import { GoogleIcon } from "@/shared/icons/google-icon";
import { useSearchParams } from "next/navigation";

export function SocialLoginButton() {
  const searchParams = useSearchParams();

  const redirectUrl =
    searchParams.get("redirect_url") || searchParams.get("redirect") || "/";

  return (
    <div className="w-full py-4 px-6">
      <Button
        className="gap-2 w-full"
        onClick={() => {
          window.location.href = `/api/oauth/google?redirect_url=${encodeURIComponent(
            redirectUrl,
          )}`;
        }}
      >
        <GoogleIcon />
        Google로 계속하기
      </Button>
    </div>
  );
}
