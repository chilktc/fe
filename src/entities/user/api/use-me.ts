import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { User } from "@/entities/user/model/types";

export const useMe = (enabled = true) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async (): Promise<User> => {
      return await api.get<User>("/api/auth/me");
    },
    enabled,
    retry: false,
  });
};
