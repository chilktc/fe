import { Button } from "@/shared/ui";
import { GoogleIcon } from "@/shared/icons/google-icon";

export function SocialLoginButton() {
  return (
    <div className="w-full py-4 px-6">
      <Button
        className="gap-2 w-full"
        onClick={() => (window.location.href = "/api/oauth/google")}
      >
        <GoogleIcon />
        Google로 계속하기
      </Button>
    </div>
  );
}
