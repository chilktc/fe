import { useAppRouter } from "@/shared/lib/router";
import { HistoryItem } from "./HistoryItem";
import { useHistory } from "@/features/my-page/history";
import { HistoryTicketListItem } from "@/entities/history/model/types";
import { PageHeader } from "@/widgets/my-page";

export function HistoryList() {
  const router = useAppRouter();
  const { data, isLoading } = useHistory();

  const onBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col flex-1 gap-5">
        <PageHeader onBack={onBack} title="팟캐스트 기록" />
        <div className="flex justify-center py-10">
          <p className="text-gray-500">불러오는 중...</p>
        </div>
      </div>
    );
  }

  const historyItems: HistoryTicketListItem[] = data?.data?.items || [];

  return (
    <div className="w-full flex flex-col flex-1 gap-5">
      <PageHeader onBack={onBack} title="팟캐스트 기록" />
      <div className="flex flex-col">
        {historyItems.length > 0 ? (
          historyItems.map((item: HistoryTicketListItem) => (
            <HistoryItem key={item.ticketId} history={item} />
          ))
        ) : (
          <div className="flex justify-center py-10">
            <p className="text-gray-500">저장된 기록이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
