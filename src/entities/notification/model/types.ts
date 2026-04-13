export interface NotificationItem {
  ticketId: string;
  dayOffset: number;
}

export interface NotificationListData {
  items: NotificationItem[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface NotificationListResponse {
  code: string;
  message: string;
  data: NotificationListData;
}
