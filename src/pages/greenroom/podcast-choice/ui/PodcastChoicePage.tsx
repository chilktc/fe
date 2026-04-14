import { useSessionStore } from "@/entities/session/model/store";
import { Page } from "@/shared/ui";
import { PodcastChoice } from "@/widgets/greenroom";

export function PodcastChoicePage() {
  const user = useSessionStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <Page className="bg-gray-100 flex-1 w-full overflow-hidden">
      <main className="flex-1 flex flex-col">
        <PodcastChoice />
      </main>
    </Page>
  );
}
