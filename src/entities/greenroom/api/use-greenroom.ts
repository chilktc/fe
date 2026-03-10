import { useQuery } from "@tanstack/react-query";
import { GreenroomResponse } from "../model/types";

export const useGreenroom = (id: string) => {
  return useQuery({
    queryKey: ["greenroom", id],
    queryFn: async (): Promise<GreenroomResponse> => {
      // 실제 API 호출 주석 처리
      // const response = await api.get<GreenroomResponse>(`/api/greenroom/${id}`);
      // return response.data;

      // 8초 지연 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 8000));

      return {
        code: "SUCCESS",
        message: "Greenroom fetched successfully",
        data: {
          id,
          imageUrl: "/assets/images/greenroom-illustration.png",
          title: "Bloom AI 💭",
          description:
            "윤정님은 지금 상사의 부당한 압박을 막아주며 팀을 챙겼음에도 믿었던 후배의 뒷담화를 듣게 되어, 배신감과 고립감 속에서 겉으로만 평온을 연기하고 있는 상황입니다.",
          keywords: ["상하압박", "뒷담화", "배신감", "억울함", "무시", "가면"],
        },
      };
    },
    enabled: !!id,
  });
};
