import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import {
  SubmitTrackingRequest,
  SubmitTrackingResponse,
} from "@/entities/tracking/model/types";

export const useSubmitTracking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SubmitTrackingRequest) => {
      return api.post<SubmitTrackingResponse>(
        `/greenroom/tickets/${data.ticketId}/tracking`,
        data,
      );
    },
    onSuccess: (_response, variables) => {
      queryClient.removeQueries({
        queryKey: ["tracking", variables.ticketId],
      });
    },
  });
};
