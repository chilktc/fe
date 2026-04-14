import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { ensureApiEnvelope } from "@/shared/api/response";
import {
  HistoryListData,
  HistoryListResponse,
} from "@/entities/history/model/types";

export function useHistory() {
  return useQuery({
    queryKey: ["history"],
    queryFn: async (): Promise<HistoryListResponse> => {
      const response = await api.get<
        HistoryListResponse | { data?: HistoryListData }
      >("/greenroom/tickets/me");

      return ensureApiEnvelope<HistoryListData>(
        response as
          | HistoryListResponse
          | HistoryListData
          | { data?: HistoryListData },
      );
    },
  });
}
