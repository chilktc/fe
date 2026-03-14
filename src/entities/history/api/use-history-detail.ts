import { useQuery } from "@tanstack/react-query";
import { HistoryDetailResponse, HistoryDetail } from "../model/types";

// 개발용 임시 상세 데이터 저장소
const mockHistoryDetailData: HistoryDetail[] = [
  {
    id: "1",
    title: "복잡한 생각을 명쾌하게 정리해 줄 이야기",
    createdAt: "2026-02-13T10:00:00Z",
    type: ["해결", "변화"],
    description: "회사생활의 무거운 가면을 잠시 내려놓는 시간, 그린룸입니다.",
    imageUrl: "/assets/images/podcast-my-image.png",
    ticket: {
      situation:
        "아니 오늘 친하게 지내던 후배가 내 뒷담을 하는 걸 들었어. 내가 과장 진급하고 위에서 하도 성과를 가지고 압박하길래 나도 나름대로 할 수 있을 수준으로 힘들게 네고하고, 후배한테도 최대한 좋게 전달하려고 했던 건데 이렇게 뒷담을 들어야 한다는게 너무 짜증난다.",
      thought:
        "나도 나름대로 중간에서 조율을 하고 내가 할 일을 하는 건데, 그거가지고 친하게 지내던 후배가 뒷담을 하는게 너무 실망이고 오히려 그러니까 나도 그냥 차갑게 대하고 싶어. 근데 그래봤자 나만 겉돌게 되는건 아닌지 무섭기도 하고… 그렇다고 상사랑 친하게 지내기도 어려운게 진짜 내 상사는 진짜 말이 안 통함.",
      action:
        "아직은 그냥 모른척 내가 하던대로 하고 있어. 그런데 후배를 마주치면 나도 모르게 얼굴이 굳고 좀 거리감이 느껴져서 괜히 툭 툭 내뱉듯이 말을 하게 되는 거 같아.",
      colleagueReaction:
        "후배는 내가 뒷담화 들은 걸 모르니까 그냥 아직까지는 자연스럽게 대하려고 하는거 같아. 내가 업무 지시를 해도 그냥 웃으면서 잘 받고. 근데 그 뒤에 불만이 가득 쌓인거지. 차라리 말을 하던지.",
    },
    podcast: {
      story:
        "회사생활의 무거운 가면을 잠시 내려놓는 시간, 그린룸입니다.\n\n오늘 그린룸에는 유독 날카로운 상처를 안고 찾아오신 분들이 많았습니다. 위에서 쏟아지는 압박을 온몸으로 막아냈는데, 정작 내가 지키려 했던 팀원들이 내 등 뒤에 칼을 꽂는 걸 목격했을 때의 그 참담함. 오늘은 이 지독한 배신감에 대해 이야기해 볼까 합니다.\n\n최근 저희 그린룸에 한 IT 기업 영업팀 팀장님의 사연이 익명으로 접수되었습니다. 편의상 'A 팀장님'이라고 부르겠습니다.",
    },
    tracking: [
      {
        date: "2026-02-27T10:00:00Z",
        isResolved: true,
        summary: "문제를 객관적으로 바라보게 되어 불안감 감소",
      },
      {
        date: "2026-02-20T10:00:00Z",
        isResolved: false,
        summary: "상담 내용을 실제 대화에 적용하기 매우 어려움",
      },
      {
        date: "2026-02-16T10:00:00Z",
        isResolved: false,
        summary: "주변 상황이 바뀌지 않아 여전히 답답함",
      },
    ],
  },
  {
    id: "2",
    title: "새로운 시작의 설렘",
    createdAt: "2026-02-12T15:30:00Z",
    type: ["성장", "도전"],
    description: "새로운 프로젝트를 시작하면서 느꼈던 감정들.",
    imageUrl: "/assets/images/podcast-my-image.png",
    ticket: {
      situation:
        "아니 오늘 친하게 지내던 후배가 내 뒷담을 하는 걸 들었어. 내가 과장 진급하고 위에서 하도 성과를 가지고 압박하길래 나도 나름대로 할 수 있을 수준으로 힘들게 네고하고, 후배한테도 최대한 좋게 전달하려고 했던 건데 이렇게 뒷담을 들어야 한다는게 너무 짜증난다.",
      thought:
        "나도 나름대로 중간에서 조율을 하고 내가 할 일을 하는 건데, 그거가지고 친하게 지내던 후배가 뒷담을 하는게 너무 실망이고 오히려 그러니까 나도 그냥 차갑게 대하고 싶어. 근데 그래봤자 나만 겉돌게 되는건 아닌지 무섭기도 하고… 그렇다고 상사랑 친하게 지내기도 어려운게 진짜 내 상사는 진짜 말이 안 통함.",
      action:
        "아직은 그냥 모른척 내가 하던대로 하고 있어. 그런데 후배를 마주치면 나도 모르게 얼굴이 굳고 좀 거리감이 느껴져서 괜히 툭 툭 내뱉듯이 말을 하게 되는 거 같아.",
      colleagueReaction:
        "후배는 내가 뒷담화 들은 걸 모르니까 그냥 아직까지는 자연스럽게 대하려고 하는거 같아. 내가 업무 지시를 해도 그냥 웃으면서 잘 받고. 근데 그 뒤에 불만이 가득 쌓인거지. 차라리 말을 하던지.",
    },
    podcast: {
      story:
        "새로운 프로젝트를 시작하며 팀원들과의 조화와 목표 달성을 위한 여정을 다룹니다. 도중에 겪는 갈등과 극복의 과정을 생생하게 전해드립니다.",
    },
    tracking: [
      {
        date: "2026-02-12T15:30:00Z",
        isResolved: true,
        summary: "프로젝트 셋업을 완료하고 성공적으로 시작했습니다.",
      },
    ],
  },
];

export function useHistoryDetail(id: string) {
  return useQuery({
    queryKey: ["history", id],
    queryFn: async (): Promise<HistoryDetailResponse> => {
      // 실제 API 연동 시
      // return await api.get<HistoryDetailResponse>(`/api/history/${id}`);

      // 목 데이터 (개발용)
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = mockHistoryDetailData.find((item) => item.id === id);

      if (!data) {
        throw new Error("History not found");
      }

      return {
        code: "SUCCESS",
        message: "성공",
        data,
      };
    },
    enabled: !!id,
  });
}
