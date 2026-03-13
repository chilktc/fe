"use client";

import { useState, useEffect } from "react";
import { AdminUser } from "@/entities/admin/model/types";
import { BaseModal } from "@/shared/ui";
import { useUpdateAdminUser } from "@/entities/admin/api/use-admin-users";
import { useSessionStore } from "@/entities/session/model/store";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
}

export function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  const { mutate: updateUser, isPending } = useUpdateAdminUser();
  const { user: currentUser } = useSessionStore();
  const [formData, setFormData] = useState<AdminUser | null>(null);

  const isSelf = currentUser?.email === user?.email;

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  if (!user || !formData) return null;

  const handleRoleChange = (role: "Admin" | "Member") => {
    if (isSelf) return;
    setFormData((prev) => (prev ? { ...prev, role } : null));
  };

  const handleSubmit = () => {
    if (formData) {
      updateUser(formData, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isChanged =
    formData.name !== user.name ||
    formData.department !== user.department ||
    formData.position !== user.position ||
    formData.role !== user.role;

  const inputStyles =
    "w-full border border-gray-400 rounded-[10px] h-[52px] px-4 text-body-4 text-gray-900 focus:outline-none focus:border-primary-400 disabled:opacity-50";
  const labelStyles = "text-label-1 text-gray-900 min-w-[60px]";

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="조직원 정보 수정"
      submitLabel="수정하기"
      onSubmit={handleSubmit}
      isSubmitLoading={isPending}
      isSubmitDisabled={!isChanged}
      containerClassName="max-w-[480px] p-10"
    >
      <div className="flex flex-col gap-5">
        {/* 이름 */}
        <div className="flex items-center gap-3">
          <label className={labelStyles}>이름</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) =>
                prev ? { ...prev, name: e.target.value } : null,
              )
            }
            className={inputStyles}
          />
        </div>

        {/* 이메일 */}
        <div className="flex items-center gap-3">
          <label className={labelStyles}>이메일</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) =>
                prev ? { ...prev, email: e.target.value } : null,
              )
            }
            className={inputStyles}
            disabled
          />
        </div>

        {/* 부서 */}
        <div className="flex items-center gap-3">
          <label className={labelStyles}>부서</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) =>
              setFormData((prev) =>
                prev ? { ...prev, department: e.target.value } : null,
              )
            }
            className={inputStyles}
          />
        </div>

        {/* 직급 */}
        <div className="flex items-center gap-3">
          <label className={labelStyles}>직급</label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) =>
              setFormData((prev) =>
                prev ? { ...prev, position: e.target.value } : null,
              )
            }
            className={inputStyles}
          />
        </div>

        {/* 권한 */}
        <div className="flex items-center gap-3">
          <label className={labelStyles}>권한</label>
          <div className="flex flex-1 gap-2.5">
            <button
              type="button"
              disabled={isSelf}
              onClick={() => handleRoleChange("Member")}
              className={`flex-1 h-[52px] rounded-[10px] border transition-all text-button-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                formData.role === "Member"
                  ? "bg-primary-200 border-primary-400 text-gray-900 border-2"
                  : "bg-gray-200 border-gray-400 text-gray-800"
              }`}
            >
              Member
            </button>
            <button
              type="button"
              disabled={isSelf}
              onClick={() => handleRoleChange("Admin")}
              className={`flex-1 h-[52px] rounded-[10px] border transition-all text-button-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                formData.role === "Admin"
                  ? "bg-primary-200 border-primary-400 text-gray-900 border-2"
                  : "bg-gray-200 border-gray-400 text-gray-800"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* 상태 */}
        <div className="flex items-center gap-3">
          <label className={labelStyles}>상태</label>
          <input
            type="text"
            value={formData.status === "active" ? "활성" : "대기"}
            disabled
            className={inputStyles}
          />
        </div>

        {/* 가입일 */}
        <div className="flex items-center gap-3">
          <label className={labelStyles}>가입일</label>
          <input
            type="text"
            value={formData.joinedAt}
            disabled
            className={inputStyles}
          />
        </div>
      </div>
    </BaseModal>
  );
}
