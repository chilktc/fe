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
      const response = await api.patch<User | { data?: User }>(
        "/users/me",
        payload,
      );
      return unwrapData<User>(response);
    },
    onSuccess: (updatedUser, variables) => {
      const currentUser = useSessionStore.getState().user;
      const nextUser = currentUser
        ? {
            ...currentUser,
            ...updatedUser,
            nickname: updatedUser.nickname ?? variables.nickname,
          }
        : {
            ...updatedUser,
            nickname: updatedUser.nickname ?? variables.nickname,
          };

      setUser(nextUser);
      queryClient.setQueryData(["auth", "me"], nextUser);
      void queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
};
