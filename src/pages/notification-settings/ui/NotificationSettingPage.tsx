import { useSessionStore } from "@/entities/session/model/store";
import { useAppRouter } from "@/shared/lib/router";
import { Divide, PagePanel, Switch } from "@/shared/ui";
import { PageHeader } from "@/widgets/my-page";
import {
  useNotificationPreference,
  useUpdateNotificationPreference,
} from "@/features/notifications/api/useNotificationPreference";

export function NotificationSettingPage() {
  const router = useAppRouter();
  const user = useSessionStore((state) => state.user);
  const { data, isLoading } = useNotificationPreference();
  const { mutate: updatePreference, isPending } =
    useUpdateNotificationPreference();

  if (!user) {
    return null;
  }

  return (
    <PagePanel panelClassName="gap-4">
      <PageHeader onBack={router.back} title="알림 설정" />

      <div className="w-full flex flex-col pt-4">
        <Divide className="bg-gray-400" />

        <div>
          <div className="flex items-center justify-between gap-3 py-2.5 px-4">
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <span className="text-heading-6 text-gray-900 font-bold">
                고민 해결 트래킹
              </span>
              <span className="text-label-2 text-gray-800 break-words">
                상담 일주일 후, 해결 여부와 변화를 체크해드려요
              </span>
            </div>
            <Switch
              checked={data?.data.enabled ?? false}
              onChange={() => updatePreference()}
              disabled={isLoading || isPending}
              className={isLoading || isPending ? "opacity-60" : ""}
            />
          </div>
          <Divide className="bg-gray-400" />
        </div>
      </div>
    </PagePanel>
  );
}
