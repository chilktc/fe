import { useMutation } from "@tanstack/react-query";
import { SubmitTrackingRequest, SubmitTrackingResponse } from "../model/types";

export const useSubmitTracking = () => {
  return useMutation({
    mutationFn: async (data: SubmitTrackingRequest) => {
      // 실제 API 연동 시 사용할 코드
      // return api.post<SubmitTrackingResponse>(`/api/tracking/${data.id}`, data);

      // api 통신이 아직 준비되지 않았으므로 1초 지연 후 모의 데이터 반환
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        code: "SUCCESS",
        message: "Tracking submitted successfully",
        data: {
          id: data.id,
        },
      } as SubmitTrackingResponse;
    },
  });
};
