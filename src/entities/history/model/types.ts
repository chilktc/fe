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
  data: HistoryListData;
}

export interface HistoryDetailResponse {
  code: string;
  message: string;
  data: HistoryDetail;
}
