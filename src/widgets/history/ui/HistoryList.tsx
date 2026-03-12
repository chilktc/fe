import { MyPageHeader } from "@/widgets/header";
import { useRouter } from "next/navigation";
import { HistoryItem } from "./HistoryItem";
import { useHistory } from "@/entities/history/api/use-history";
import { HistoryListItem } from "@/entities/history/model/types";

export function HistoryList() {
  const router = useRouter();
  const { data, isLoading } = useHistory();

  const onBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col flex-1 gap-5">
        <MyPageHeader onBack={onBack} title="팟캐스트 기록" />
        <div className="flex justify-center py-10">
          <p className="text-gray-500">불러오는 중...</p>
        </div>
      </div>
    );
  }

  const historyItems: HistoryListItem[] = data?.data || [];

  return (
    <div className="w-full flex flex-col flex-1 gap-5">
      <MyPageHeader onBack={onBack} title="팟캐스트 기록" />
      <div className="flex flex-col">
        {historyItems.length > 0 ? (
          historyItems.map((item: HistoryListItem) => (
            <HistoryItem key={item.id} history={item} />
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
