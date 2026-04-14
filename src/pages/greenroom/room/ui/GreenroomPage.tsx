import { useSessionStore } from "@/entities/session/model/store";
import { useGreenroom } from "@/features/greenroom";
import { Page } from "@/shared/ui";
import {
  Greenroom,
  GreenroomFallback,
  GreenroomLoading,
} from "@/widgets/greenroom";

export function GreenroomPage() {
  const user = useSessionStore((state) => state.user);
  const { data, isError, isLoading, refetch, isFetching, errorMessage } =
    useGreenroom();

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
            description={errorMessage ?? "잠시만 기다려 주세요"}
          />
        ) : null}
        {!isLoading && hasGreenroomData ? (
          <Greenroom data={greenroomData} />
        ) : null}
      </main>
    </Page>
  );
}
