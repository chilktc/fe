import { useSessionStore } from "@/entities/session/model/store";
import { PagePanel } from "@/shared/ui";
import { NotificationsList } from "@/widgets/notifications/ui/NotificationsList";

export function NotificationsPage() {
  const user = useSessionStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <PagePanel panelClassName="gap-10">
      <NotificationsList />
    </PagePanel>
  );
}
