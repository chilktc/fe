import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { unwrapData } from "@/shared/api/response";
import { useSessionStore } from "@/entities/session/model/store";
import { User } from "@/entities/user/model/types";

interface UpdateProfilePayload {
  nickname: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useSessionStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload): Promise<User> => {
      const response = await api.patch<User | { data?: User }>("/auth/profile", payload);
      return unwrapData<User>(response);
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.setQueryData(["auth", "me"], updatedUser);
    },
  });
};
