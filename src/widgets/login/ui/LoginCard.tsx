import { Logo } from "@/shared/assets/logo";
import { SocialLoginButton } from "@/features/auth/ui/social-login-button";

export function LoginCard() {
  return (
    <div className="w-full py-4 flex flex-col items-center bg-gray-200 border border-gray-400 rounded-2xl">
      <div className="w-full flex items-center justify-center py-6">
        <Logo className="w-auto! h-25!" />
      </div>
      <div className="w-full text-center px-8 py-4">
        <h1 className="text-heading-4 text-gray-900">
          Connect, Sustain, Blossom!
        </h1>
        <p className="text-body-4 text-gray-800">
          직장인들의 건강한 멘탈케어를 위한 전용 공간, Bloom입니다. 구글
          계정으로 간편하게 접속하여 당신의 마음을 돌보는 여정을 시작해 보세요.
        </p>
      </div>
      <SocialLoginButton />
    </div>
  );
}
