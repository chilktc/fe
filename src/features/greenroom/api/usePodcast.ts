import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { PodcastResponse } from "@/entities/greenroom/model/types";

export function usePodcast(id: string) {
  return useQuery({
    queryKey: ["podcast", id],
    queryFn: async (): Promise<PodcastResponse> => {
      return api.get<PodcastResponse>(`/greenroom/${id}/podcast`);
    },
    enabled: !!id,
  });
}
