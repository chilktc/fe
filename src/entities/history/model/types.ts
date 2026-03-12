export interface HistoryListItem {
  id: string;
  title: string;
  createdAt: string;
  type: string[];
  description: string;
  imageUrl: string;
}

export interface TrackingEvent {
  date: string;
  isResolved: boolean;
  summary: string;
}

export interface HistoryDetail extends HistoryListItem {
  ticket: {
    situation: string;
    thought: string;
    action: string;
    colleagueReaction: string;
  };
  podcast: {
    story: string;
  };
  tracking: TrackingEvent[];
}

export interface HistoryListResponse {
  code: string;
  message: string;
  data: HistoryListItem[];
}

export interface HistoryDetailResponse {
  code: string;
  message: string;
  data: HistoryDetail;
}
