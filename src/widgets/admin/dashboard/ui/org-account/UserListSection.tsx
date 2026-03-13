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

export function UserListSection() {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const pageSize = 8;
  const { data, isLoading } = useAdminUsers(page, pageSize);
  const { mutate: deleteUser } = useDeleteAdminUser();

  const handleDelete = (id: string) => {
    deleteUser(id);
  };

  const handleEdit = (user: AdminUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

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
              onDelete={handleDelete}
              onEdit={handleEdit}
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

      {isEditModalOpen && selectedUser && (
        <EditUserModal
          key={selectedUser.id}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
}
