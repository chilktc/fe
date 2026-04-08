import { Logo } from "@/shared/assets/logo";
import { Button } from "@/shared/ui";
import { useAppRouter } from "@/shared/lib/router";

interface TermsCompleteProps {
  redirectUrl: string;
}

export function TermsComplete({ redirectUrl }: TermsCompleteProps) {
  const router = useAppRouter();

  const handleStart = () => {
    router.replace(redirectUrl);
  };

  return (
    <div className="w-full bg-gray-200 border border-gray-400 py-4 rounded-2xl">
      <div className="w-full flex items-center justify-center py-6">
        <Logo className="h-25! w-auto!" />
      </div>
      <div className="px-8 py-4 space-y-3">
        <h2 className="text-heading-4 text-gray-900">가입 완료!</h2>
        <p className="text-body-4 text-gray-800">
          Bloom의 가족이 되신 것을 환영합니다! 🎉
          <br />
          지금 이 순간부터 당신의 마음 건강은 Bloom이 함께 고민하겠습니다.
        </p>
      </div>

      <div className="w-full py-4 px-6">
        <Button className="w-full" onClick={handleStart}>
          홈으로 가기
        </Button>
      </div>
    </div>
  );
}
