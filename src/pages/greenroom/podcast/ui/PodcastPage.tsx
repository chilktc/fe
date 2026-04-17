import { useSessionStore } from "@/entities/session/model/store";
import { usePodcast } from "@/features/greenroom";
import { useGreenroomSessionStore } from "@/entities/greenroom/model/store";
import { Page } from "@/shared/ui";
import {
  GreenroomFallback,
  GreenroomLoading,
  Podcast,
} from "@/widgets/greenroom";

export function PodcastPage() {
  const user = useSessionStore((state) => state.user);
  const selectedPodcastChoice = useGreenroomSessionStore(
    (state) => state.selectedPodcastChoice,
  );
  const { data, isLoading, isError, error, refetch, isFetching } = usePodcast();

  const hasPodcastData = !!data?.data;

  if (!user) {
    return null;
  }

  return (
    <Page className="bg-gray-100 flex-1 w-full overflow-hidden">
      <main className="flex-1 flex flex-col min-h-0 w-full">
        {isLoading ? <GreenroomLoading /> : null}
        {!isLoading && (isError || !hasPodcastData) ? (
          <GreenroomFallback
            onRetry={() => {
              void refetch();
            }}
            isRetrying={isFetching}
            description={error?.message ?? "잠시만 기다려 주세요"}
          />
        ) : null}
        {!isLoading && hasPodcastData ? (
          <Podcast data={data.data} selectedChoice={selectedPodcastChoice} />
        ) : null}
      </main>
    </Page>
  );
}
