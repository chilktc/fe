import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { ensureApiEnvelope } from "@/shared/api/response";
import {
  HistoryDetailData,
  HistoryDetailResponse,
  HistoryPodcastDetail,
  HistoryTicketDetail,
  HistoryTrackingEvent,
} from "@/entities/history/model/types";

export function useHistoryDetail(id: string) {
  return useQuery({
    queryKey: ["history", id],
    queryFn: async (): Promise<HistoryDetailResponse> => {
      const [ticketResponse, podcastResponse, trackingResponse] =
        await Promise.all([
          api.get<{ data?: HistoryTicketDetail } | { code: string; message: string; data: HistoryTicketDetail }>(
            `/greenroom/tickets/${id}`,
          ),
          api.get<{ data?: HistoryPodcastDetail } | { code: string; message: string; data: HistoryPodcastDetail }>(
            `/greenroom/ai/tickets/podcast/${id}`,
          ),
          api.get<{ data?: HistoryTrackingEvent[] } | { code: string; message: string; data: HistoryTrackingEvent[] }>(
            `/greenroom/tickets/${id}/tracking`,
          ),
        ]);

      const ticket = ensureApiEnvelope<HistoryTicketDetail>(
        ticketResponse as
          | { code: string; message: string; data: HistoryTicketDetail }
          | HistoryTicketDetail
          | { data?: HistoryTicketDetail },
      );
      const podcast = ensureApiEnvelope<HistoryPodcastDetail>(
        podcastResponse as
          | { code: string; message: string; data: HistoryPodcastDetail }
          | HistoryPodcastDetail
          | { data?: HistoryPodcastDetail },
      );
      const tracking = ensureApiEnvelope<HistoryTrackingEvent[]>(
        trackingResponse as
          | { code: string; message: string; data: HistoryTrackingEvent[] }
          | HistoryTrackingEvent[]
          | { data?: HistoryTrackingEvent[] },
      );

      const detailData: HistoryDetailData = {
        ticket: ticket.data,
        podcast: podcast.data,
        tracking: tracking.data,
      };

      return {
        code: ticket.code,
        message: ticket.message,
        data: detailData,
      };
    },
    enabled: !!id,
  });
}
