"use client";

import { useState } from "react";
import { AdminUser } from "@/entities/admin/model/types";
import {
  useAdminUsers,
  useDeleteAdminUser,
} from "@/features/admin/user-management";
import { Modal } from "@/shared/ui";
import { UserTable } from "./UserTable";
import { Pagination } from "./Pagination";
import { EditUserModal } from "./EditUserModal";

export function UserListSection() {
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null);

  const { data, isLoading, isError, error } = useAdminUsers(page);
  const { mutate: deleteUser, isPending: isDeletePending } = useDeleteAdminUser();

  const handleConfirmDelete = () => {
    if (!deletingUser) return;

    deleteUser(deletingUser.id, {
      onSuccess: () => {
        setDeletingUser(null);
        setPage(1);
        alert("조직원이 삭제되었습니다.");
      },
      onError: (err) =>
        alert(err instanceof Error ? err.message : "삭제에 실패했습니다."),
    });
  };

  return (
    <div className="py-5 space-y-7.5">
      <div className=" w-full">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-400" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-16 text-body-4 text-gray-500">
            사용자 목록을 불러오지 못했습니다.
            {error instanceof Error ? ` (${error.message})` : ""}
          </div>
        ) : (
          <>
            <UserTable
              users={data?.users ?? []}
              onDelete={(user) => setDeletingUser(user)}
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

      <Modal
        isOpen={deletingUser !== null}
        onClose={() => setDeletingUser(null)}
        onSubmit={handleConfirmDelete}
        isSubmitLoading={isDeletePending}
        submitLabel="삭제"
        cancelLabel="취소"
      >
        <div className="py-4 text-center">
          <p className="mb-2 text-heading-6 font-bold text-gray-900">
            조직원 삭제
          </p>
          <p className="text-label-2 text-gray-700">
            {deletingUser?.name ?? "선택한 조직원"}을(를) 정말 삭제하시겠습니까?
          </p>
        </div>
      </Modal>
    </div>
  );
}
