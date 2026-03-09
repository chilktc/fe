import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import {
  CreateTicketRequest,
  CreateTicketResponse,
} from "@/entities/ticket/model/types";

export const useCreateTicket = () => {
  return useMutation({
    mutationFn: async (answers: string[]) => {
      const body: CreateTicketRequest = {
        situation: answers[0],
        thought: answers[1],
        action: answers[2],
        // 건너뛰기면 colleagueReaction은 보내지 않기
        ...(answers[3] !== "건너뛰기" && { colleagueReaction: answers[3] }),
      };
      // 실제 API 연동 시 사용할 코드
      // return api.post<CreateTicketResponse>("/api/greenroom/tickets", body);

      // api 통신이 아직 준비되지 않았으므로 2초 지연 후 모의 데이터 반환
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        code: "SUCCESS",
        message: "Ticket created successfully",
        data: {
          id: "mock_ticket_id_123",
          userId: "mock_user",
          name: "Mock User",
          situation: body.situation,
          thought: body.thought,
          action: body.action,
          colleagueReaction: body.colleagueReaction || "",
          createdAt: new Date().toISOString(),
        },
      } as CreateTicketResponse;
    },
  });
};
