import { useEffect, useMemo, useRef } from "react";
import { useAppRouter } from "@/shared/lib/router";
import { useNotifications } from "@/features/notifications/api/useNotifications";
import { NotificationItem } from "@/entities/notification/model/types";
import { PageHeader } from "@/widgets/my-page";
import { DotMenuIcon } from "@/shared/icons";

const NOTIFICATION_CONTENT_BY_DAY_OFFSET: Record<
  number,
  { title: string; description: string; label: string }
> = {
  3: {
    label: "3일 후",
    title: "상담 후 3일, 마음은 좀 어떠신가요?",
    description:
      "팟캐스트에서 나눈 대화가 일상에 작은 힘이 되고 있는지 궁금해요",
  },
  7: {
    label: "7일 후",
    title: "나를 돌본 일주일, 참 잘하셨어요",
    description: "일주일간의 변화를 기록해볼까요?",
  },
  14: {
    label: "14일 후",
    title: "2주 전의 고민을 기억하시나요?",
    description: "상담 후 피어난 변화의 씨앗을 확인해보세요",
  },
};

function getNotificationContent(dayOffset: number) {
  return (
    NOTIFICATION_CONTENT_BY_DAY_OFFSET[dayOffset] ?? {
      label: `${dayOffset}일 후`,
      title: "트래킹 알림",
      description: "상담 이후의 변화를 확인해보세요",
    }
  );
}

interface NotificationListItemProps {
  item: NotificationItem;
  onClick: () => void;
}

function NotificationListItem({ item, onClick }: NotificationListItemProps) {
  const content = getNotificationContent(item.dayOffset);

  return (
    <button
      type="button"
      onClick={onClick}
      className="py-3 px-4 border-b border-gray-400 flex items-center justify-between gap-3 text-left cursor-pointer"
    >
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-heading-6 text-gray-900">{content.title}</p>
        <p className="text-label-3 text-gray-700 wrap-break-words">
          {content.description}
        </p>
      </div>
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
            <div className="w-full h-4 rounded-md skeletonUI" />
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
