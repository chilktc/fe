export interface TrackingDetail {
  id: string;
  createdAt: string;
  description: string;
  keywords: string[];
  imageUrl: string;
}

export interface TrackingResponse {
  code: string;
  message: string;
  data: TrackingDetail;
}

export interface SubmitTrackingRequest {
  ticketId: string;
  status: "RESOLVED" | "UNRESOLVED";
  resolvedHelpType?:
    | "SIMILAR_STORY_EMPATHY"
    | "RECOMMENDED_ACTION_WORKED"
    | "COMMUNICATION_RESOLVED"
    | "TIME_NATURALLY_RESOLVED"
    | "CONSULTED_ACQUAINTANCE"
    | "ETC";
  resolvedStateType?:
    | "FULLY_DONE"
    | "MOSTLY_OK_SOMETIMES_RECALL"
    | "WORRIED_IF_REPEATED"
    | "CAN_HANDLE_IF_REPEATED"
    | "RESOLVED_BUT_NEW_CONCERN"
    | "ETC";
  unresolvedBlockerType?:
    | "DONT_KNOW_WHAT_TO_DO"
    | "HARD_TO_ACT"
    | "TRIED_BUT_DIDNT_WORK"
    | "EMOTIONS_TOO_OVERWHELMING"
    | "OTHERS_OR_ENVIRONMENT_NOT_CHANGING"
    | "ETC";
  unresolvedNeedType?:
    | "CALM_EMOTION_FIRST"
    | "ORGANIZE_SITUATION_LOGICALLY"
    | "NEED_SMALL_ACTION"
    | "NEED_OTHERS_ADVICE"
    | "NEED_PSYCHOLOGICAL_STABILITY"
    | "ETC";
  note: string | null;
}

export interface SubmitTrackingResponse {
  code: string;
  message: string;
  data: {
    id: string;
  };
}
