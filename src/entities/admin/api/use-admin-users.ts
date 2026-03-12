import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/base";
import { AdminUser, AdminUsersResponse } from "../model/types";

let mockAdminUsers: AdminUser[] = [
  {
    id: "1",
    name: "캐클업",
    email: "somedding6363@gmail.com",
    department: "UX 기획팀",
    position: "대리",
    role: "Admin",
    status: "active",
    joinedAt: "2026.03.11",
  },
  {
    id: "2",
    name: "캐클업",
    email: "kttechup1@gmail.com",
    department: "UX 기획팀",
    position: "대리",
    role: "Member",
    status: "pending",
    joinedAt: "2026.03.11",
  },
  {
    id: "3",
    name: "캐클업",
    email: "kttechup2@gmail.com",
    department: "UX 기획팀",
    position: "대리",
    role: "Member",
    status: "active",
    joinedAt: "2026.03.11",
  },
  {
    id: "4",
    name: "캐클업",
    email: "kttechup3@gmail.com",
    department: "UX 기획팀",
    position: "대리",
    role: "Member",
    status: "active",
    joinedAt: "2026.03.11",
  },
  {
    id: "5",
    name: "캐클업",
    email: "kttechup4@gmail.com",
    department: "UX 기획팀",
    position: "대리",
    role: "Member",
    status: "pending",
    joinedAt: "2026.03.11",
  },
  {
    id: "6",
    name: "캐클업",
    email: "kttechup5@gmail.com",
    department: "UX 기획팀",
    position: "대리",
    role: "Member",
    status: "pending",
    joinedAt: "2026.03.11",
  },
  {
    id: "7",
    name: "캐클업",
    email: "kttechup6@gmail.com",
    department: "UX 기획팀",
    position: "대리",
    role: "Member",
    status: "active",
    joinedAt: "2026.03.11",
  },
  {
    id: "8",
    name: "캐클업",
    email: "kttechup7@gmail.com",
    department: "UX 기획팀",
    position: "대리",
    role: "Member",
    status: "active",
    joinedAt: "2026.03.11",
  },
  {
    id: "9",
    name: "캐클업",
    email: "kttechup8@gmail.com",
    department: "UX 기획팀",
    position: "대리",
    role: "Member",
    status: "active",
    joinedAt: "2026.03.11",
  },
  {
    id: "10",
    name: "캐클업",
    email: "kttechup9@gmail.com",
    department: "UX 기획팀",
    position: "대리",
    role: "Member",
    status: "pending",
    joinedAt: "2026.03.11",
  },
];

const ADMIN_USERS_KEY = ["admin", "users"] as const;

export function useAdminUsers(page: number = 1, pageSize: number = 8) {
  return useQuery<AdminUsersResponse>({
    queryKey: [...ADMIN_USERS_KEY, page, pageSize],
    queryFn: async (): Promise<AdminUsersResponse> => {
      await new Promise((r) => setTimeout(r, 300));
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return {
        users: mockAdminUsers.slice(start, end),
        total: mockAdminUsers.length,
        page,
        pageSize,
        totalPages: Math.ceil(mockAdminUsers.length / pageSize),
      };
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
      await api.post("/api/admin/users/invite", data);
    },
    onSuccess: (_data, variables) => {
      // API에서 데이터가 오지 않으므로 목데이터에 직접 추가
      const today = new Date();
      const joinedAt = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
      const newUser: AdminUser = {
        id: String(Date.now()),
        name: variables.email.split("@")[0],
        email: variables.email,
        department: "-",
        position: "-",
        role: "Member",
        status: "pending",
        joinedAt,
      };
      mockAdminUsers = [newUser, ...mockAdminUsers];
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
  });
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // 실제 삭제 API 준비 전까지 목데이터에서만 제거
      await new Promise((r) => setTimeout(r, 200));
      mockAdminUsers = mockAdminUsers.filter((u) => u.id !== id);
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
      // 실제 업데이트 API 준비 전까지 목데이터에서만 수정
      await new Promise((r) => setTimeout(r, 200));
      mockAdminUsers = mockAdminUsers.map((u) =>
        u.id === updatedUser.id ? updatedUser : u,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
  });
}
