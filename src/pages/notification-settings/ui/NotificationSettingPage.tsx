import { useState } from "react";
import { useSessionStore } from "@/entities/session/model/store";
import { useAppRouter } from "@/shared/lib/router";
import { Divide, PagePanel, Switch } from "@/shared/ui";
import { PageHeader } from "@/widgets/my-page";

const NOTIFICATION_ITEMS = [
  {
    key: "response",
    title: "응답",
    description: "입장권 제출 후 팟캐스트가 생성되면 알려드려요",
  },
  {
    key: "tracking",
    title: "고민 해결 트래킹",
    description: "상담 일주일 후, 해결 여부와 변화를 체크해드려요",
  },
] as const;

export function NotificationSettingPage() {
  const router = useAppRouter();
  const user = useSessionStore((state) => state.user);
  const [notificationState, setNotificationState] = useState({
    response: true,
    tracking: true,
  });

  if (!user) {
    return null;
  }

  return (
    <PagePanel panelClassName="gap-4">
      <PageHeader onBack={router.back} title="알림 설정" />

      <div className="w-full flex flex-col pt-4">
        <Divide className="bg-gray-400" />

        {NOTIFICATION_ITEMS.map((item) => (
          <div key={item.key}>
            <div className="flex items-center justify-between gap-3 py-2.5 px-4">
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="text-heading-6 text-gray-900 font-bold">
                  {item.title}
                </span>
                <span className="text-label-2 text-gray-800 break-words">
                  {item.description}
                </span>
              </div>
              <Switch
                checked={notificationState[item.key]}
                onChange={(checked) =>
                  setNotificationState((prev) => ({
                    ...prev,
                    [item.key]: checked,
                  }))
                }
              />
            </div>
            <Divide className="bg-gray-400" />
          </div>
        ))}
      </div>
    </PagePanel>
  );
}
