import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { unwrapData } from "@/shared/api/response";
import { AdminUser, AdminUsersResponse } from "@/entities/admin/model/types";

const ADMIN_USERS_KEY = ["admin", "users"] as const;

type RawAdminUser = Partial<AdminUser> & {
  role?: string;
  status?: string;
  joinedAt?: string;
  createdAt?: string;
};

type RawAdminUsersResponse =
  | AdminUsersResponse
  | {
      content?: RawAdminUser[];
      totalElements?: number;
      totalPages?: number;
      number?: number;
      size?: number;
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
    id: String(user.id ?? ""),
    name: user.name ?? user.email?.split("@")[0] ?? "-",
    email: user.email ?? "",
    department: user.department ?? "-",
    position: user.position ?? "-",
    role: normalizeRole(user.role),
    isActive: normalizeStatus(user.status),
    createdAt: normalizeDate(user.joinedAt ?? user.createdAt),
  };
}

function normalizeUsersResponse(
  raw: RawAdminUsersResponse,
  page: number,
  pageSize: number,
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
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(users.length / pageSize)),
    };
  }

  if ("content" in unwrapped && Array.isArray(unwrapped.content)) {
    const pageResponse = unwrapped as {
      content: RawAdminUser[];
      totalElements?: number;
      totalPages?: number;
      number?: number;
      size?: number;
    };
    const users = pageResponse.content.map(normalizeUser);
    return {
      users,
      total: pageResponse.totalElements ?? users.length,
      page: (pageResponse.number ?? page - 1) + 1,
      pageSize: pageResponse.size ?? pageSize,
      totalPages:
        pageResponse.totalPages ??
        Math.max(
          1,
          Math.ceil(
            (pageResponse.totalElements ?? users.length) /
              (pageResponse.size ?? pageSize),
          ),
        ),
    };
  }

  return {
    users: (unwrapped.users ?? []).map(normalizeUser),
    total: unwrapped.total ?? unwrapped.users?.length ?? 0,
    page: unwrapped.page ?? page,
    pageSize: unwrapped.pageSize ?? pageSize,
    totalPages:
      unwrapped.totalPages ??
      Math.max(
        1,
        Math.ceil(
          (unwrapped.total ?? unwrapped.users?.length ?? 0) /
            (unwrapped.pageSize ?? pageSize),
        ),
      ),
  };
}

export function useAdminUsers(page: number = 1, pageSize: number = 8) {
  return useQuery<AdminUsersResponse>({
    queryKey: [...ADMIN_USERS_KEY, page, pageSize],
    queryFn: async (): Promise<AdminUsersResponse> => {
      const response = await api.get<RawAdminUsersResponse>(
        `/admin/users?page=${page}&pageSize=${pageSize}`,
      );
      return normalizeUsersResponse(response, page, pageSize);
    },
  });
}

export interface AdminUserInviteRequest {
  email: string;
  role: "USER";
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
      return await api.delete(`/admin/users/${id}`);
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
      return await api.patch(`/admin/users/${updatedUser.id}`, {
        name: updatedUser.name,
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
