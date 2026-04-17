import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { ensureApiEnvelope } from "@/shared/api/response";
import {
  NotificationPreference,
  NotificationPreferenceResponse,
} from "@/entities/notification/model/types";

const NOTIFICATION_PREFERENCE_QUERY_KEY = ["notification-preference"];
const NOTIFICATION_PREFERENCE_PATH = "/auth/notifications/preference";

export function useNotificationPreference() {
  return useQuery({
    queryKey: NOTIFICATION_PREFERENCE_QUERY_KEY,
    queryFn: async (): Promise<NotificationPreferenceResponse> => {
      const response = await api.get<NotificationPreferenceResponse>(
        NOTIFICATION_PREFERENCE_PATH,
      );

      return ensureApiEnvelope<NotificationPreference>(response);
    },
  });
}

export function useUpdateNotificationPreference() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<NotificationPreferenceResponse> => {
      const response = await api.put<NotificationPreferenceResponse>(
        NOTIFICATION_PREFERENCE_PATH,
      );

      return ensureApiEnvelope<NotificationPreference>(response);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(NOTIFICATION_PREFERENCE_QUERY_KEY, result);
    },
  });
}
