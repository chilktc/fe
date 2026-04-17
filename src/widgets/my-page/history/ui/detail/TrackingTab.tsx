import { HistoryTrackingEvent } from "@/entities/history/model/types";

interface TrackingTabProps {
  tracking: HistoryTrackingEvent[];
  createdAt: string;
}

export function TrackingTab({ tracking, createdAt }: TrackingTabProps) {
  const resolvedHelpTypeLabelMap: Record<string, string> = {
    SIMILAR_STORY_EMPATHY: "비슷한 사연 공감",
    RECOMMENDED_ACTION_WORKED: "추천 행동이 도움됨",
    COMMUNICATION_RESOLVED: "대화로 해결",
    TIME_NATURALLY_RESOLVED: "시간이 지나 해결",
    CONSULTED_ACQUAINTANCE: "지인 상담",
    ETC: "기타",
  };

  const resolvedStateTypeLabelMap: Record<string, string> = {
    FULLY_DONE: "완전히 끝남",
    MOSTLY_OK_SOMETIMES_RECALL: "대체로 괜찮음",
    WORRIED_IF_REPEATED: "비슷한 상황이 걱정됨",
    CAN_HANDLE_IF_REPEATED: "다시 와도 대응 가능",
    RESOLVED_BUT_NEW_CONCERN: "해결됐지만 새 고민 있음",
    ETC: "기타",
  };

  const unresolvedBlockerTypeLabelMap: Record<string, string> = {
    DONT_KNOW_WHAT_TO_DO: "무엇부터 할지 모름",
    HARD_TO_ACT: "실행이 어려움",
    TRIED_BUT_DIDNT_WORK: "시도했지만 효과 없음",
    EMOTIONS_TOO_OVERWHELMING: "감정이 너무 큼",
    OTHERS_OR_ENVIRONMENT_NOT_CHANGING: "상대/환경이 바뀌지 않음",
    ETC: "기타",
  };

  const unresolvedNeedTypeLabelMap: Record<string, string> = {
    CALM_EMOTION_FIRST: "감정 진정이 먼저 필요",
    ORGANIZE_SITUATION_LOGICALLY: "상황 정리가 필요",
    NEED_SMALL_ACTION: "작은 행동이 필요",
    NEED_OTHERS_ADVICE: "다른 사람 조언이 필요",
    NEED_PSYCHOLOGICAL_STABILITY: "심리적 안정이 필요",
    ETC: "기타",
  };

  const getTrackingSummary = (event: HistoryTrackingEvent) => {
    if (event.status === "RESOLVED") {
      return [
        event.resolvedHelpType
          ? resolvedHelpTypeLabelMap[event.resolvedHelpType] ||
            event.resolvedHelpType
          : null,
        event.resolvedStateType
          ? resolvedStateTypeLabelMap[event.resolvedStateType] ||
            event.resolvedStateType
          : null,
        event.note,
      ]
        .filter(Boolean)
        .join(" · ");
    }

    return [
      event.unresolvedBlockerType
        ? unresolvedBlockerTypeLabelMap[event.unresolvedBlockerType] ||
          event.unresolvedBlockerType
        : null,
      event.unresolvedNeedType
        ? unresolvedNeedTypeLabelMap[event.unresolvedNeedType] ||
          event.unresolvedNeedType
        : null,
      event.note,
    ]
      .filter(Boolean)
      .join(" · ");
  };

  const groupedTracking = tracking.reduce(
    (acc, event) => {
      const year = new Date(event.trackedAt).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(event);
      return acc;
    },
    {} as Record<number, HistoryTrackingEvent[]>,
  );

  if (tracking.length === 0) {
    return (
      <div className="flex items-center justify-center pt-4 pb-8">
        <p className="text-body-6 text-gray-700">트래킹 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pt-4 pb-8">
      {Object.entries(groupedTracking)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, events]) => (
          <div key={year} className="flex flex-col gap-6">
            <h3 className="text-heading-3 text-gray-900 font-bold px-2">
              {year}년
            </h3>
            <div className="relative flex flex-col gap-10 pl-6 ml-4 border-l border-gray-400 border-dashed">
              {events
                .sort(
                  (a, b) =>
                    new Date(b.trackedAt).getTime() -
                    new Date(a.trackedAt).getTime(),
                )
                .map((event, index) => {
                  const eventDate = new Date(event.trackedAt);
                  const createdDate = new Date(createdAt);
                  const diffTime = eventDate.getTime() - createdDate.getTime();
                  const diffDays = Math.max(
                    0,
                    Math.floor(diffTime / (1000 * 60 * 60 * 24)),
                  );

                  return (
                    <div key={index} className="relative flex flex-col">
                      <div
                        className={`absolute -left-8 top-1 w-4 h-4 rounded-full border-2 border-primary-400 ${
                          index === 0 ? "bg-primary-400" : "bg-gray-200"
                        }`}
                      />

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-body-6 text-gray-800">
                            {eventDate.getMonth() + 1}.{eventDate.getDate()}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-300 rounded text-label-3 text-gray-800 font-bold">
                            D+{diffDays}
                          </span>
                        </div>
                        <h4 className="text-heading-6 text-gray-900 font-bold flex items-center gap-1">
                          {event.status === "RESOLVED" ? "해결 🎉" : "미해결 🔒"}
                        </h4>
                        <p className="text-body-6 text-gray-700">
                          {getTrackingSummary(event)}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
    </div>
  );
}
