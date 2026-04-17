import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { unwrapData } from "@/shared/api/response";
import { AdminUser, AdminUsersResponse } from "@/entities/admin/model/types";

const ADMIN_USERS_KEY = ["admin", "users"] as const;

type RawAdminUser = Partial<AdminUser> & {
  userId?: string;
  role?: string;
  status?: string;
  joinedAt?: string;
  createdAt?: string;
};

type RawAdminUsersResponse =
  | AdminUsersResponse
  | {
      items?: RawAdminUser[];
      totalElements?: number;
      totalPages?: number;
      page?: number;
      size?: number;
      hasNext?: boolean;
    }
  | { data?: AdminUsersResponse | RawAdminUser[] }
  | RawAdminUser[];

function normalizeRole(role?: string): AdminUser["role"] {
  return role?.toUpperCase() === "ADMIN" || role === "Admin" ? "ADMIN" : "USER";
}

function normalizeStatus(status?: string): AdminUser["isActive"] {
  return status?.toLowerCase() === "active" ? true : false;
}

function normalizeDate(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function normalizeUser(user: RawAdminUser): AdminUser {
  return {
    id: String(user.userId ?? user.id ?? ""),
    name: user.name ?? user.email?.split("@")[0] ?? "-",
    email: user.email ?? "",
    department: user.department ?? "-",
    position: user.position ?? "-",
    role: normalizeRole(user.role),
    isActive: user.isActive ?? normalizeStatus(user.status),
    createdAt: normalizeDate(user.joinedAt ?? user.createdAt),
  };
}

function normalizeUsersResponse(
  raw: RawAdminUsersResponse,
): AdminUsersResponse {
  const unwrapped = unwrapData<AdminUsersResponse | RawAdminUser[]>(
    raw as
      | AdminUsersResponse
      | { data?: AdminUsersResponse | RawAdminUser[] }
      | RawAdminUser[],
  );

  if (Array.isArray(unwrapped)) {
    const users = unwrapped.map(normalizeUser);
    return {
      users,
      total: users.length,
      page: 1,
      size: users.length,
      totalPages: Math.max(1, users.length > 0 ? 1 : 0),
      hasNext: false,
    };
  }

  if ("items" in unwrapped && Array.isArray(unwrapped.items)) {
    const pageResponse = unwrapped as {
      items: RawAdminUser[];
      totalElements?: number;
      totalPages?: number;
      page?: number;
      size?: number;
      hasNext?: boolean;
    };
    const users = pageResponse.items.map(normalizeUser);
    return {
      users,
      total: pageResponse.totalElements ?? users.length,
      page: (pageResponse.page ?? 0) + 1,
      size: pageResponse.size ?? users.length,
      totalPages: pageResponse.totalPages ?? (users.length > 0 ? 1 : 0),
      hasNext: pageResponse.hasNext ?? false,
    };
  }

  return {
    users: (unwrapped.users ?? []).map(normalizeUser),
    total: unwrapped.total ?? unwrapped.users?.length ?? 0,
    page: unwrapped.page ?? 1,
    size: unwrapped.size ?? unwrapped.users?.length ?? 0,
    totalPages: unwrapped.totalPages ?? 0,
    hasNext: unwrapped.hasNext ?? false,
  };
}

export function useAdminUsers(page: number = 1) {
  return useQuery<AdminUsersResponse>({
    queryKey: [...ADMIN_USERS_KEY, page],
    queryFn: async (): Promise<AdminUsersResponse> => {
      const response = await api.get<RawAdminUsersResponse>(
        `/admin/users?page=${page - 1}`,
      );
      return normalizeUsersResponse(response);
    },
  });
}

export interface AdminUserInviteRequest {
  name: string;
  email: string;
  department: string;
  position: string;
  role: "USER" | "ADMIN";
}

export function useAdminUserInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AdminUserInviteRequest) => {
      return await api.post("/admin/users/invite", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
  });
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await api.put(`/admin/users/${id}/delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
  });
}

export function useUpdateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUser: AdminUser) => {
      return await api.put(`/admin/users/${updatedUser.id}`, {
        name: updatedUser.name,
        email: updatedUser.email,
        department: updatedUser.department,
        position: updatedUser.position,
        role: updatedUser.role,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
  });
}
