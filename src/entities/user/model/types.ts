export interface User {
  id: string;
  email: string;
  nickname: string;
  profileImage?: string;
  role?: 'USER' | 'ADMIN';
  createdAt?: string;
}
