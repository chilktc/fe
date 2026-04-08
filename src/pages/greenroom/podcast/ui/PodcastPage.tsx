import { useParams } from "react-router-dom";
import { useSessionStore } from "@/entities/session/model/store";
import { usePodcast } from "@/features/greenroom";
import { Page } from "@/shared/ui";
import { GreenroomLoading, Podcast } from "@/widgets/greenroom";

export function PodcastPage() {
  const { id = "" } = useParams<{ id: string }>();
  const user = useSessionStore((state) => state.user);
  const { data, isLoading } = usePodcast(id);

  if (!user) {
    return null;
  }

  return (
    <Page className="bg-gray-100 flex-1 w-full overflow-hidden">
      <main className="flex-1 flex flex-col min-h-0 w-full">
        {isLoading ? <GreenroomLoading /> : data?.data && <Podcast data={data.data} />}
      </main>
    </Page>
  );
}
