import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { ensureApiEnvelope } from "@/shared/api/response";
import {
  HistoryDetail,
  HistoryDetailResponse,
} from "@/entities/history/model/types";

export function useHistoryDetail(id: string) {
  return useQuery({
    queryKey: ["history", id],
    queryFn: async (): Promise<HistoryDetailResponse> => {
      const response = await api.get<
        HistoryDetailResponse | { data?: HistoryDetail }
      >(`/greenroom/tickets/${id}`);
      return ensureApiEnvelope<HistoryDetail>(
        response as
          | HistoryDetailResponse
          | HistoryDetail
          | { data?: HistoryDetail },
      );
    },
    enabled: !!id,
  });
}
