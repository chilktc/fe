import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { User } from "../model/types";
import { useSessionStore } from "@/entities/session/model/store";

interface UpdateProfilePayload {
  nickname: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useSessionStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload): Promise<User> => {
      // 실제 API 연동 시 주석 해제
      // return await api.patch<User>("/api/auth/profile", payload);

      // 목 데이터 사용
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        id: "1",
        email: "somedding6363@gmail.com",
        nickname: payload.nickname,
        firstLogin: false,
      };
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.setQueryData(["auth", "me"], updatedUser);
    },
  });
};
