import { HistoryList } from "@/widgets/my-page";
import { PagePanel } from "@/shared/ui";
import { useSessionStore } from "@/entities/session/model/store";

export function HistoryPage() {
  const user = useSessionStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <PagePanel panelClassName="gap-10">
      <HistoryList />
    </PagePanel>
  );
}
