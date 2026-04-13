"use client";

import { AdminUser } from "@/entities/admin/model/types";

interface UserTableProps {
  users: AdminUser[];
  onDelete: (user: AdminUser) => void;
  onEdit: (user: AdminUser) => void;
}

function StatusBadge({ status }: { status: boolean }) {
  return (
    <div
      className={`flex items-center justify-center px-1.5 py-1 rounded-[6px] transition-colors text-caption-2 ${status ? "bg-[#DCFCE7] text-[#016630]" : "bg-[#FEF9C2] text-[#894B00]"}`}
    >
      {status ? "활성" : "대기중"}
    </div>
  );
}

function UserAvatar({ name }: { name: string }) {
  return (
    <div className="w-9 h-9 rounded-full bg-primary-200 flex items-center justify-center text-gray-900 text-label-1 shrink-0">
      {name[0]}
    </div>
  );
}

export function UserTable({ users, onDelete, onEdit }: UserTableProps) {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="grid grid-cols-[4fr_2fr_1.5fr_1.5fr_1.5fr_1fr_1fr] gap-4 px-4 py-3 text-label-1 text-gray-900 bg-gray-100 rounded-t-[10px] text-center">
        <span>이름</span>
        <span>부서 / 직급</span>
        <span>권한</span>
        <span>상태</span>
        <span>가입일</span>
        <span>삭제</span>
        <span>수정</span>
      </div>

      {/* Table Rows */}
      {users.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-[4fr_2fr_1.5fr_1.5fr_1.5fr_1fr_1fr] gap-4 px-4 py-4 items-center border-b border-white/5 hover:bg-white/3 transition-colors text-center"
        >
          {/* Name */}
          <div className="flex items-center gap-3 text-start">
            <UserAvatar name={user.name} />
            <div>
              <p className="text-label-1 text-gray-900">{user.name}</p>
              <p className="text-caption-1 text-gray-800">{user.email}</p>
            </div>
          </div>

          {/* Department / Position */}
          <div>
            <p className="text-caption-1 text-gray-900">{user.department}</p>
            <p className="text-caption-1 text-gray-800">{user.position}</p>
          </div>

          {/* Role */}
          <span className="text-caption-1 text-gray-900">{user.role}</span>

          {/* Status */}
          <div className="flex items-center justify-center">
            <StatusBadge status={user.isActive} />
          </div>

          {/* Joined At */}
          <span className="text-caption-1 text-gray-900">{user.createdAt}</span>

          {/* Delete */}
          <button
            onClick={() => onDelete(user)}
            className="mx-auto flex items-center justify-center fill-gray-200 hover:fill-accent-red transition-colors cursor-pointer"
          >
            <svg
              width="32"
              height="24"
              viewBox="0 0 32 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="30.3043"
                height="23"
                rx="11.5"
                fill="#232425"
              />
              <rect
                x="0.5"
                y="0.5"
                width="30.3043"
                height="23"
                rx="11.5"
                stroke="#55585D"
              />
              <path
                d="M13.9126 16.5616C14.0079 16.5616 14.0844 16.5341 14.1422 16.4793C14.1999 16.4244 14.2273 16.3523 14.2245 16.2627L14.0382 10.0133C14.0382 9.92384 14.0079 9.8531 13.9473 9.80113C13.8895 9.74916 13.8174 9.72318 13.7307 9.72318C13.6326 9.72318 13.5546 9.75061 13.4969 9.80546C13.442 9.85743 13.416 9.92817 13.4189 10.0177L13.5965 16.2671C13.6023 16.3566 13.6326 16.4273 13.6874 16.4793C13.7452 16.5341 13.8202 16.5616 13.9126 16.5616ZM15.619 16.5616C15.7143 16.5616 15.7908 16.5341 15.8485 16.4793C15.9092 16.4244 15.9395 16.3523 15.9395 16.2627V10.0177C15.9395 9.92817 15.9092 9.85743 15.8485 9.80546C15.7908 9.75061 15.7143 9.72318 15.619 9.72318C15.5237 9.72318 15.4458 9.75061 15.3851 9.80546C15.3274 9.85743 15.2985 9.92817 15.2985 10.0177V16.2627C15.2985 16.3523 15.3274 16.4244 15.3851 16.4793C15.4458 16.5341 15.5237 16.5616 15.619 16.5616ZM17.321 16.5616C17.4163 16.5616 17.4914 16.5356 17.5462 16.4836C17.604 16.4317 17.6343 16.3595 17.6372 16.2671L17.8147 10.022C17.8176 9.9325 17.7902 9.86032 17.7324 9.80546C17.6776 9.75061 17.6025 9.72318 17.5072 9.72318C17.4177 9.72318 17.3441 9.74916 17.2864 9.80113C17.2286 9.8531 17.1983 9.92528 17.1954 10.0177L17.0135 16.2671C17.0106 16.3537 17.0366 16.4244 17.0915 16.4793C17.1492 16.5341 17.2257 16.5616 17.321 16.5616ZM13.2067 8.34597V7.11168C13.2067 6.72479 13.3236 6.42163 13.5575 6.2022C13.7943 5.97989 14.1191 5.86873 14.5319 5.86873H16.693C17.1059 5.86873 17.4293 5.97989 17.6631 6.2022C17.8999 6.42163 18.0183 6.72479 18.0183 7.11168V8.34597H17.2604V7.15499C17.2604 6.98175 17.2055 6.84317 17.0958 6.73923C16.9861 6.63529 16.8374 6.58332 16.6497 6.58332H14.5753C14.3876 6.58332 14.2389 6.63529 14.1292 6.73923C14.0195 6.84317 13.9646 6.98175 13.9646 7.15499V8.34597H13.2067ZM10.6082 8.72275C10.5129 8.72275 10.4292 8.68811 10.357 8.61881C10.2848 8.54663 10.2487 8.46146 10.2487 8.36329C10.2487 8.26513 10.2848 8.17995 10.357 8.10777C10.4292 8.03559 10.5129 7.9995 10.6082 7.9995H20.6254C20.7236 7.9995 20.8073 8.03559 20.8766 8.10777C20.9488 8.17707 20.9849 8.26224 20.9849 8.36329C20.9849 8.46146 20.9503 8.54663 20.881 8.61881C20.8117 8.68811 20.7265 8.72275 20.6254 8.72275H10.6082ZM13.0768 18.2376C12.8227 18.2376 12.5989 18.1856 12.4055 18.0817C12.2149 17.9778 12.0634 17.832 11.9508 17.6443C11.8382 17.4566 11.7761 17.2386 11.7645 16.9903L11.3531 8.61015H19.8849L19.4734 16.986C19.4619 17.2343 19.3984 17.4523 19.2829 17.64C19.1703 17.8276 19.0173 17.9734 18.8238 18.0774C18.6333 18.1842 18.4138 18.2376 18.1655 18.2376H13.0768Z"
                fill="white"
              />
            </svg>
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(user)}
            className="mx-auto flex items-center justify-center fill-gray-200 hover:fill-accent-red transition-colors cursor-pointer"
          >
            <svg
              width="32"
              height="24"
              viewBox="0 0 32 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="30.3043"
                height="23"
                rx="11.5"
                fill="#232425"
              />
              <rect
                x="0.5"
                y="0.5"
                width="30.3043"
                height="23"
                rx="11.5"
                stroke="#55585D"
              />
              <path
                d="M21.713 8.54875C21.9844 8.27737 21.9844 7.82508 21.713 7.56762L20.0847 5.93937C19.8273 5.668 19.375 5.668 19.1036 5.93937L17.8233 7.21275L20.4326 9.82212M9.38977 15.6532V18.2626H11.9991L19.6951 10.5597L17.0857 7.95033L9.38977 15.6532Z"
                fill="#E9EAEE"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
