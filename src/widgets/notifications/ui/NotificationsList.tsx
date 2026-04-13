import { useEffect, useMemo, useRef } from "react";
import { useAppRouter } from "@/shared/lib/router";
import { useNotifications } from "@/features/notifications/api/useNotifications";
import { NotificationItem } from "@/entities/notification/model/types";
import { PageHeader } from "@/widgets/my-page";
import { DotMenuIcon } from "@/shared/icons";

function formatDayOffset(dayOffset: number) {
  if (dayOffset === 0) {
    return "오늘";
  }

  if (dayOffset === 1) {
    return "1일 전";
  }

  return `${dayOffset}일 전`;
}

interface NotificationListItemProps {
  item: NotificationItem;
  onClick: () => void;
}

function NotificationListItem({ item, onClick }: NotificationListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="py-3 px-4 border-b border-gray-400 flex items-center justify-between gap-3 text-left cursor-pointer"
    >
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-heading-6 text-gray-900">트래킹 알림</p>
        <p className="text-body-6 text-gray-700 break-all">{item.ticketId}</p>
      </div>
      <span className="shrink-0 text-caption-1 text-gray-700">
        {formatDayOffset(item.dayOffset)}
      </span>
    </button>
  );
}

function NotificationsListSkeleton() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="py-3 px-4 border-b border-gray-400 flex items-center justify-between gap-3"
        >
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="w-1/2 h-6 rounded-md skeletonUI" />
            <div className="w-full h-5 rounded-md skeletonUI" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NotificationsList() {
  const router = useAppRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useNotifications();
  const settingsButton = (
    <button
      type="button"
      onClick={() => router.push("/notification-settings")}
      className="w-10 h-10 flex items-center justify-center border border-gray-700/50 rounded-full cursor-pointer"
      aria-label="알림 설정으로 이동"
    >
      <DotMenuIcon />
    </button>
  );

  const notificationItems = useMemo(
    () => data?.pages.flatMap((page) => page.data.items) ?? [],
    [data],
  );

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col flex-1 gap-5">
        <PageHeader
          onBack={router.back}
          title="알림센터"
          rightAction={settingsButton}
        />
        <NotificationsListSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col flex-1 gap-5">
      <PageHeader
        onBack={router.back}
        title="알림센터"
        rightAction={settingsButton}
      />
      <div className="flex flex-col">
        {notificationItems.length > 0 ? (
          notificationItems.map((item) => (
            <NotificationListItem
              key={`${item.ticketId}-${item.dayOffset}`}
              item={item}
              onClick={() => router.push(`/tracking/${item.ticketId}`)}
            />
          ))
        ) : (
          <div className="flex justify-center py-10">
            <p className="text-gray-500">도착한 알림이 없습니다.</p>
          </div>
        )}
        <div ref={loadMoreRef} className="h-8" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <p className="text-gray-500">알림을 더 불러오는 중...</p>
          </div>
        )}
      </div>
    </div>
  );
}
