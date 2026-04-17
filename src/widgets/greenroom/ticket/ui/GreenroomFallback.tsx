import { Button } from "@/shared/ui";
import { LogoLetter } from "@/shared/assets/logo";
import { ArrowLeftIcon } from "@/shared/icons";
import { useAppRouter } from "@/shared/lib/router";
import { ErrorIcon } from "@/shared/icons/error-icon";

interface GreenroomFallbackProps {
  onRetry: () => void;
  isRetrying: boolean;
  description: string;
}

export function GreenroomFallback({
  onRetry,
  isRetrying,
  description,
}: GreenroomFallbackProps) {
  const router = useAppRouter();

  return (
    <div className="flex-1 flex flex-col px-3 py-5 text-center">
      <header className="relative h-12 flex items-center justify-center shrink-0">
        <button
          type="button"
          className="absolute left-0 w-12 h-12 flex items-center justify-center cursor-pointer"
          onClick={router.back}
          aria-label="뒤로가기"
        >
          <ArrowLeftIcon className="[&_path]:fill-gray-900" />
        </button>
        <div aria-hidden="true">
          <LogoLetter className="w-auto! h-4!" />
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center items-center gap-1">
        <ErrorIcon className="w-8! h-8!" />
        <h2 className="text-gray-900 text-heading-3">
          시스템에 잠깐 문제가 생겼어요
        </h2>
        <p className="text-gray-800 text-body-6">{description}</p>
      </div>
      <Button
        className="mt-6 w-full h-14 text-button-1"
        onClick={onRetry}
        isLoading={isRetrying}
      >
        새로고침하기
      </Button>
    </div>
  );
}
