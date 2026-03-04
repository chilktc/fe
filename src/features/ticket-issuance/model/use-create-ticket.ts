import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import {
  CreateTicketRequest,
  CreateTicketResponse,
} from "@/entities/ticket/model/types";

export const useCreateTicket = () => {
  return useMutation({
    mutationFn: (answers: string[]) => {
      const body: CreateTicketRequest = {
        situation: answers[0],
        thought: answers[1],
        action: answers[2],
        // 건너뛰기면 colleagueReaction은 보내지 않기
        ...(answers[3] !== "건너뛰기" && { colleagueReaction: answers[3] }),
      };
      return api.post<CreateTicketResponse>("/api/greenroom/tickets", body);
    },
  });
};
