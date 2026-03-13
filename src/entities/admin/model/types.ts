export interface AdminUser {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: "Admin" | "Member";
  status: "active" | "pending";
  joinedAt: string;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
