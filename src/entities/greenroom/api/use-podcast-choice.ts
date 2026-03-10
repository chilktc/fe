import { useQuery } from "@tanstack/react-query";
import { PodcastChoiceResponse } from "../model/types";

export const usePodcastChoice = (id: string) => {
  return useQuery({
    queryKey: ["podcast-choice", id],
    queryFn: async (): Promise<PodcastChoiceResponse> => {
      // 실제 API 호출 주석 처리
      // const response = await api.get<PodcastChoiceResponse>(`/api/greenroom/${id}/podcast-choice`);
      // return response.data;

      // 1초 지연 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        code: "SUCCESS",
        message: "Greenroom fetched successfully",
        data: [
          {
            id: "id1",
            imageUrl: "/assets/images/podcast-image1.png",
            type: ["공감", "위로"],
            title: "지친 마음을 따뜻하게 안아주는 이야기",
            description:
              "지금은 애써 나아가지 않아도 괜찮아요. 따뜻한 위로의 목소리로 지친 마음을 먼저 다독여 줄게요.",
          },
          {
            id: "id2",
            imageUrl: "/assets/images/podcast-image2.png",
            type: ["해결", "변화"],
            title: "복잡한 생각을 명쾌하게 정리해 줄 이야기",
            description:
              "막막했던 상황을 바꿀 수 있는 실마리를 찾아봐요. 현실적인 조언과 함께 다시 시작할 힘을 얻어보세요.",
          },
        ],
      };
    },
    enabled: !!id,
  });
};
