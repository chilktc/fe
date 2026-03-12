import { useQuery } from "@tanstack/react-query";
import { HistoryListResponse, HistoryListItem } from "../model/types";

// 개발용 임시 리스트 데이터 저장소
let mockHistoryListData: HistoryListItem[] = [
  {
    id: "1",
    title: "복잡한 생각을 명쾌하게 정리해 줄 이야기",
    createdAt: "2026-02-13T10:00:00Z",
    type: ["해결", "변화"],
    description: "회사생활의 무거운 가면을 잠시 내려놓는 시간, 그린룸입니다.",
    imageUrl: "/assets/images/podcast-my-image.png",
  },
  {
    id: "2",
    title: "새로운 시작의 설렘",
    createdAt: "2026-02-12T15:30:00Z",
    type: ["성장", "도전"],
    description: "새로운 프로젝트를 시작하면서 느꼈던 감정들.",
    imageUrl: "/assets/images/podcast-my-image.png",
  },
];

// 목 데이터 삭제를 위한 헬퍼 함수
export const deleteMockHistory = (id: string) => {
  mockHistoryListData = mockHistoryListData.filter((item) => item.id !== id);
};

export function useHistory() {
  return useQuery({
    queryKey: ["history"],
    queryFn: async (): Promise<HistoryListResponse> => {
      // 실제 API 연동 시
      // return await api.get<HistoryListResponse>("/api/history");

      // 목 데이터 (개발용)
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        code: "SUCCESS",
        message: "성공",
        data: [...mockHistoryListData],
      };
    },
  });
}
