"use client";

import { useState } from "react";
import { AdminUser } from "@/entities/admin/model/types";
import {
  useAdminUsers,
  useDeleteAdminUser,
} from "@/features/admin/user-management";
import { UserTable } from "./UserTable";
import { Pagination } from "./Pagination";
import { EditUserModal } from "./EditUserModal";

const PAGE_SIZE = 8;

export function UserListSection() {
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const { data, isLoading } = useAdminUsers(page, PAGE_SIZE);
  const { mutate: deleteUser } = useDeleteAdminUser();

  return (
    <div className="py-5 space-y-7.5">
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
