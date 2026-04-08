import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { ensureApiEnvelope } from "@/shared/api/response";
import {
  HistoryListItem,
  HistoryListResponse,
} from "@/entities/history/model/types";

export function useHistory() {
  return useQuery({
    queryKey: ["history"],
    queryFn: async (): Promise<HistoryListResponse> => {
      const response = await api.get<
        HistoryListResponse | { data?: HistoryListItem[] }
      >("/greenroom/tickets/me");
      return ensureApiEnvelope<HistoryListItem[]>(
        response as
          | HistoryListResponse
          | HistoryListItem[]
          | { data?: HistoryListItem[] },
      );
    },
  });
}
