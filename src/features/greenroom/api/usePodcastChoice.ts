import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { PodcastChoiceResponse } from "@/entities/greenroom/model/types";

export function usePodcastChoice(id: string) {
  return useQuery({
    queryKey: ["podcast-choice", id],
    queryFn: async (): Promise<PodcastChoiceResponse> => {
      return api.get<PodcastChoiceResponse>(`/greenroom/${id}/podcast-choice`);
    },
    enabled: !!id,
  });
}
