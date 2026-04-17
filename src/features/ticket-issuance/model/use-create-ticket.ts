import { useMutation } from "@tanstack/react-query";
import {
  CreateTicketRequest,
  CreateTicketResponse,
} from "@/entities/ticket/model/types";
import { api } from "@/shared/api/base";

interface CreateTicketResult {
  data: CreateTicketResponse;
}

export const useCreateTicket = () => {
  return useMutation({
    mutationFn: async (answers: string[]) => {
      const body: CreateTicketRequest = {
        situation: answers[0],
        thought: answers[1],
        action: answers[2],
        ...(answers[3] !== "건너뛰기" && { colleagueReaction: answers[3] }),
      };

      return {
        data: await api.post<CreateTicketResponse, CreateTicketRequest>(
          "/greenroom/ai/tickets",
          body,
        ),
      } satisfies CreateTicketResult;
    },
  });
};
