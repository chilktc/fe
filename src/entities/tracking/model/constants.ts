export const TRACKING_STEPS = {
  solved: {
    step2: {
      title: "무엇이 가장 도움이 됐나요?",
      options: [
        "비슷한 사연을 보며 감정이 정리됐어요",
        "제안된 방법을 실행해서 상황이 바뀌었어요",
        "대화와 의사표현으로 풀었어요",
        "시간이 지나며 자연스럽게 해결됐어요",
        "지인과 상담을 했어요",
        "기타",
      ],
    },
    step3: {
      title: "지금 상태는 어느 쪽에 가깝나요?",
      options: [
        "완전히 끝났다",
        "대부분 괜찮지만 가끔 생각난다",
        "비슷한 상황이 다시 오면 당황할 것 같다",
        "비슷한 상황이 다시 봐도 해결 할 수 있을 것 같다",
        "해결은 됐지만 다른 고민이 생겼다",
        "기타",
      ],
    },
    step4: {
      title: "다시 한 번 해결을 축하드립니다!",
      description:
        "익명으로 사연을 공유해 다른 사용자에게 큰 도움이 되어주세요",
      button: "공유하고 마무리하기",
    },
  },
  "not-solved": {
    step2: {
      title: "지금 가장 큰 걸림돌은 무엇인가요?",
      options: [
        "무엇부터 해야 할지 모르겠다",
        "해보려 했지만 실행이 어렵다",
        "문제 해결을 시도했지만 효과가 없었다",
        "감정이 너무 커서 다루기 어렵다",
        "상대/환경이 바뀌지 않는다",
        "기타",
      ],
    },
    step3: {
      title: "지금 필요한 건 어떤 쪽에 가까워요?",
      options: [
        "감정부터 가라앉히고 싶다",
        "상황을 이성적으로 정리하고 싶다",
        "바로 실행할 작은 행동이 필요하다",
        "다른 경험자의 조언이 필요하다",
        "심리적으로 안정이 필요하다",
        "기타",
      ],
    },
    step4: {
      title: "고민 상태 기록을 완료했습니다",
      description: "다음 기록은 일주일 뒤에 예정되어 있어요",
      button: "홈으로 이동하기",
    },
  },
} as const;

export const RESOLVED_HELP_TYPE_MAP = {
  "비슷한 사연을 보며 감정이 정리됐어요": "SIMILAR_STORY_EMPATHY",
  "제안된 방법을 실행해서 상황이 바뀌었어요": "RECOMMENDED_ACTION_WORKED",
  "대화와 의사표현으로 풀었어요": "COMMUNICATION_RESOLVED",
  "시간이 지나며 자연스럽게 해결됐어요": "TIME_NATURALLY_RESOLVED",
  "지인과 상담을 했어요": "CONSULTED_ACQUAINTANCE",
  기타: "ETC",
} as const;

export const RESOLVED_STATE_TYPE_MAP = {
  "완전히 끝났다": "FULLY_DONE",
  "대부분 괜찮지만 가끔 생각난다": "MOSTLY_OK_SOMETIMES_RECALL",
  "비슷한 상황이 다시 오면 당황할 것 같다": "WORRIED_IF_REPEATED",
  "비슷한 상황이 다시 봐도 해결 할 수 있을 것 같다": "CAN_HANDLE_IF_REPEATED",
  "해결은 됐지만 다른 고민이 생겼다": "RESOLVED_BUT_NEW_CONCERN",
  기타: "ETC",
} as const;

export const UNRESOLVED_BLOCKER_TYPE_MAP = {
  "무엇부터 해야 할지 모르겠다": "DONT_KNOW_WHAT_TO_DO",
  "해보려 했지만 실행이 어렵다": "HARD_TO_ACT",
  "문제 해결을 시도했지만 효과가 없었다": "TRIED_BUT_DIDNT_WORK",
  "감정이 너무 커서 다루기 어렵다": "EMOTIONS_TOO_OVERWHELMING",
  "상대/환경이 바뀌지 않는다": "OTHERS_OR_ENVIRONMENT_NOT_CHANGING",
  기타: "ETC",
} as const;

export const UNRESOLVED_NEED_TYPE_MAP = {
  "감정부터 가라앉히고 싶다": "CALM_EMOTION_FIRST",
  "상황을 이성적으로 정리하고 싶다": "ORGANIZE_SITUATION_LOGICALLY",
  "바로 실행할 작은 행동이 필요하다": "NEED_SMALL_ACTION",
  "다른 경험자의 조언이 필요하다": "NEED_OTHERS_ADVICE",
  "심리적으로 안정이 필요하다": "NEED_PSYCHOLOGICAL_STABILITY",
  기타: "ETC",
} as const;
