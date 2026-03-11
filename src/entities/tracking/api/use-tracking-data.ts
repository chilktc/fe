import { useState, useEffect } from "react";
import { TrackingDetail, TrackingResponse } from "../model/types";

export function useTrackingData(id: string) {
  const [data, setData] = useState<TrackingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 실제 API 연동 시 주석 해제
        // const response = await api.get(`/tracking/${id}`);
        // setData(response);

        // 목 데이터 사용
        await new Promise((resolve) => setTimeout(resolve, 800));
        setData({
          code: "SUCCESS",
          message: "성공",
          data: {
            id,
            date: "2026년 2월 13일 (금)",
            title: "중간관리자의 아이러니",
            type: ["해결", "변화"],
            description:
              "과장으로서 위에서 내려오는 성과 압박물 중간에서 조율하며 후배에게 최대한 완충해서 전달했는데, 그 후배가 뒤에서 불만을 말하는 걸 듣고 배신감과 분노를 느끼고 있다. 그래서 관계를 차갑게 정리하고 싶지만, 그렇게 하면 조직 안에서 스스로 고립될까 봐 두렵다. 겉으로는 아무 일 없는 척 업무를 이어가고 있으니, 감정이 표정과 말투에 드러나고 있고, 상대는 이를 모른 채 겉으로는 자연스럽게 행동하는 상황이다.",
            imageUrl:
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2671",
          },
        });
      } catch (err) {
        console.error("Tracking data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, isLoading };
}
