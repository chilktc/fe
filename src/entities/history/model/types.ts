export interface HistoryListItem {
  id: string;
  title: string;
  createdAt: string;
  type: string[];
  description: string;
  imageUrl: string;
}

export interface HistoryTicketListItem {
  ticketId: string;
  name: string;
  createdAt: string;
}

export interface HistoryListData {
  items: HistoryTicketListItem[];
  hasNext: boolean;
  nextCursorCreatedAt: string | null;
}

export interface HistoryTicketDetail {
  id: string;
  userId: string;
  name: string;
  situation: string;
  thought: string;
  action: string;
  colleagueReaction: string;
  createdAt: string;
}

export interface HistoryPodcastDetail {
  id: string;
  sessionId: string;
  imageUrl: string;
  text: string;
  createdAt: string;
}

export interface HistoryTrackingEvent {
  status: "RESOLVED" | "UNRESOLVED";
  trackedAt: string;
  dDay: string;
  note: string | null;
  resolvedHelpType: string | null;
  resolvedStateType: string | null;
  unresolvedBlockerType: string | null;
  unresolvedNeedType: string | null;
}

export interface HistoryDetailData {
  ticket: HistoryTicketDetail;
  podcast: HistoryPodcastDetail;
  tracking: HistoryTrackingEvent[];
}

export interface HistoryListResponse {
  code: string;
  message: string;
  data: HistoryListData;
}

export interface HistoryDetailResponse {
  code: string;
  message: string;
  data: HistoryDetailData;
}
