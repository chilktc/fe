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

export interface NotificationPreference {
  enabled: boolean;
}

export interface NotificationPreferenceResponse {
  code: string;
  message: string;
  data: NotificationPreference;
}
