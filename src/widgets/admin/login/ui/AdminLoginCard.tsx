import { SocialLoginButton } from "@/features/auth/ui/social-login-button";

export function AdminLoginCard() {
  return (
    <div className="w-full pt-5 px-4 pb-4 flex flex-col items-center gap-8 bg-gray-200 border border-gray-400 rounded-2xl">
      <div className="w-full space-y-3">
        <h1 className="text-heading-2 text-gray-900">
          Connect, Sustain, Blossom!
        </h1>
        <p className="text-body-3 text-gray-800">
          직장인들의 건강한 멘탈케어를 위한 전용 공간, Bloom입니다. 구글
          계정으로 간편하게 접속하여 당신의 마음을 돌보는 여정을 시작해 보세요.
        </p>
      </div>
      <SocialLoginButton className="py-0! px-0!" fallbackUrl="/admin" />
    </div>
  );
}
