"use client";

import { useState } from "react";
import { AdminUser } from "@/entities/admin/model/types";
import { UserTable } from "./UserTable";
import { Pagination } from "./Pagination";
import { EditUserModal } from "./EditUserModal";
import {
  useAdminUsers,
  useDeleteAdminUser,
} from "@/entities/admin/api/use-admin-users";

const PAGE_SIZE = 8;

export function UserListSection() {
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const { data, isLoading } = useAdminUsers(page, PAGE_SIZE);
  const { mutate: deleteUser } = useDeleteAdminUser();

  return (
    <div className="py-5 space-y-7.5">
      <div>
        <h2 className="text-heading-5 text-gray-900">사용자 목록</h2>
        <p className="text-body-7 text-gray-800">
          각 조직원의 정보를 확인하고 상세 권한을 관리할 수 있어요
        </p>
      </div>

      <div className=" w-full">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-400" />
          </div>
        ) : (
          <>
            <UserTable
              users={data?.users ?? []}
              onDelete={(id) => deleteUser(id)}
              onEdit={(user) => setEditingUser(user)}
            />
            {data && data.totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>

      {editingUser && (
        <EditUserModal
          key={editingUser.id}
          onClose={() => setEditingUser(null)}
          user={editingUser}
        />
      )}
    </div>
  );
}
