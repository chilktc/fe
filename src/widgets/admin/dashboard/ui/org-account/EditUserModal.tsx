"use client";

import { useState } from "react";
import { AdminUser } from "@/entities/admin/model/types";
import { useUpdateAdminUser } from "@/features/admin/user-management";
import { BaseModal } from "@/shared/ui";
import { useSessionStore } from "@/entities/session/model/store";
import { OrgUserFormFields } from "./OrgUserFormFields";

interface EditUserModalProps {
  onClose: () => void;
  user: AdminUser;
}

export function EditUserModal({ onClose, user }: EditUserModalProps) {
  const { mutate: updateUser, isPending } = useUpdateAdminUser();
  const { user: currentUser } = useSessionStore();
  const [formData, setFormData] = useState<AdminUser>(user);

  const isSelf = currentUser?.email === user?.email;

  const handleRoleChange = (role: "ADMIN" | "USER") => {
    if (isSelf) return;
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = () => {
    updateUser(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isChanged =
    formData.name !== user.name ||
    formData.department !== user.department ||
    formData.position !== user.position ||
    formData.role !== user.role;

  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      title="조직원 정보 수정"
      submitLabel="수정하기"
      onSubmit={handleSubmit}
      isSubmitLoading={isPending}
      isSubmitDisabled={!isChanged}
      containerClassName="max-w-[480px] p-10"
    >
      <div className="flex flex-col gap-5">
        <OrgUserFormFields
          formData={formData}
          onChange={(field, value) => {
            if (field === "role") {
              handleRoleChange(value as AdminUser["role"]);
              return;
            }

            setFormData((prev) => ({ ...prev, [field]: value }));
          }}
          emailDisabled
          roleDisabled={isSelf}
        />

        <div className="flex items-center gap-3">
          <label className="text-label-1 text-gray-900 min-w-[60px]">
            상태
          </label>
          <input
            type="text"
            value={formData.isActive ? "활성" : "대기중"}
            disabled
            className="w-full border border-gray-400 rounded-[10px] h-[52px] px-4 text-body-4 text-gray-900 focus:outline-none focus:border-primary-400 disabled:opacity-50"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-label-1 text-gray-900 min-w-[60px]">
            가입일
          </label>
          <input
            type="text"
            value={formData.createdAt}
            disabled
            className="w-full border border-gray-400 rounded-[10px] h-[52px] px-4 text-body-4 text-gray-900 focus:outline-none focus:border-primary-400 disabled:opacity-50"
          />
        </div>
      </div>
    </BaseModal>
  );
}
