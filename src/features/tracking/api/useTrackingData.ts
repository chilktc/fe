import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { TrackingResponse } from "@/entities/tracking/model/types";

export function useTrackingData(id: string) {
  return useQuery({
    queryKey: ["tracking", id],
    queryFn: async (): Promise<TrackingResponse> => {
      return api.get<TrackingResponse>(
        `/greenroom/ai/tickets/mind-frequencies/${id}`,
      );
    },
    enabled: !!id,
  });
}
