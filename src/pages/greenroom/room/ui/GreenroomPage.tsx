import { useParams } from "react-router-dom";
import { useSessionStore } from "@/entities/session/model/store";
import { useGreenroom } from "@/features/greenroom";
import { Button, Page } from "@/shared/ui";
import { Greenroom, GreenroomLoading } from "@/widgets/greenroom";
import { ErrorIcon } from "@/shared/icons/error-icon";

export function GreenroomPage() {
  const { id = "" } = useParams<{ id: string }>();
  const user = useSessionStore((state) => state.user);
  const { data, isError, isLoading, refetch, isFetching } = useGreenroom(id);

  if (!user) {
    return null;
  }

  const greenroomData = data?.data ?? null;
  const hasGreenroomData = greenroomData !== null;

  return (
    <Page className="bg-gray-100 flex-1 w-full overflow-hidden">
      <main className="flex-1 flex flex-col">
        {isLoading ? <GreenroomLoading /> : null}
        {!isLoading && (isError || !hasGreenroomData) ? (
          <GreenroomFallback
            onRetry={() => {
              void refetch();
            }}
            isRetrying={isFetching}
          />
        ) : null}
        {!isLoading && hasGreenroomData ? (
          <Greenroom data={greenroomData} />
        ) : null}
      </main>
    </Page>
  );
}

interface GreenroomFallbackProps {
  onRetry: () => void;
  isRetrying: boolean;
}

function GreenroomFallback({ onRetry, isRetrying }: GreenroomFallbackProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-3 py-5 text-center">
      <div className="flex-1 flex flex-col justify-center items-center gap-1">
        <ErrorIcon className="w-8! h-8!" />
        <h2 className="text-gray-900 text-heading-3">
          시스템에 잠깐 문제가 생겼어요
        </h2>
        <p className="text-gray-800 text-body-6">잠시만 기다려 주세요</p>
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
