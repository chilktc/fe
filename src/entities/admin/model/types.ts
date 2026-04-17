export interface AdminUser {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
  createdAt: string;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
  hasNext: boolean;
}
