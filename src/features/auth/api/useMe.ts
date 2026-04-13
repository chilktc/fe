import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { unwrapData } from "@/shared/api/response";
import { User } from "@/entities/user/model/types";

interface MeResponse extends Omit<User, "role"> {
  role?: User["role"];
}

function normalizeUser(user: MeResponse | null | undefined): User {
  if (!user?.id || !user?.email) {
    throw new Error("Unauthenticated");
  }

  return {
    ...user,
    role:
      user.role ??
      (user.email === "chilktc.admin@gmail.com" ? "ADMIN" : "USER"),
  };
}

export function useMe(enabled = true) {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async (): Promise<User> => {
      const response = await api.get<MeResponse | { data?: MeResponse }>(
        "/auth/me",
      );
      return normalizeUser(unwrapData<MeResponse>(response));
    },
    enabled,
    retry: false,
  });
}
