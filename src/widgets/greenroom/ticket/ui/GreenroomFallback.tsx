import { Button } from "@/shared/ui";
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
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-3 py-5 text-center">
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
