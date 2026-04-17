import { useParams } from "react-router-dom";
import { PagePanel } from "@/shared/ui";
import { HistoryDetail } from "@/widgets/my-page";

export function HistoryDetailPage() {
  const { id = "" } = useParams<{ id: string }>();

  return (
    <PagePanel panelClassName="overflow-hidden min-h-0">
      <HistoryDetail id={id} />
    </PagePanel>
  );
}
