import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { GreenroomResponse } from "@/entities/greenroom/model/types";

export function useGreenroom(id: string) {
  return useQuery({
    queryKey: ["greenroom", id],
    queryFn: async (): Promise<GreenroomResponse> => {
      return api.get<GreenroomResponse>(`/greenroom/tickets/${id}`);
    },
    enabled: !!id,
  });
}
