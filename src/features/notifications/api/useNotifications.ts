import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { ensureApiEnvelope } from "@/shared/api/response";
import {
  NotificationListData,
  NotificationListResponse,
} from "@/entities/notification/model/types";

const NOTIFICATION_PAGE_SIZE = 20;

export function useNotifications() {
  return useInfiniteQuery({
    queryKey: ["notification"],
    initialPageParam: null as string | null,
    queryFn: async ({ pageParam }): Promise<NotificationListResponse> => {
      const response = await api.get<NotificationListResponse>(
        "/notification",
        {
          params: {
            cursor: pageParam ?? undefined,
            size: NOTIFICATION_PAGE_SIZE,
          },
        },
      );

      return ensureApiEnvelope<NotificationListData>(response);
    },
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
  });
}
