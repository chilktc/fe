import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import {
  SubmitTrackingRequest,
  SubmitTrackingResponse,
} from "@/entities/tracking/model/types";

export const useSubmitTracking = () => {
  return useMutation({
    mutationFn: async (data: SubmitTrackingRequest) => {
      return api.post<SubmitTrackingResponse>(
        `/greenroom/tickets/${data.ticketId}/tracking`,
        data,
      );
    },
  });
};
