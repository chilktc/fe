"use client";

import { useState } from "react";
import { useAdminUserInvite } from "@/features/admin/user-management";
import { BaseModal } from "@/shared/ui";
import { OrgUserFormFields } from "./OrgUserFormFields";

interface InviteUserModalProps {
  onClose: () => void;
}

interface InviteUserFormData {
  name: string;
  email: string;
  department: string;
  position: string;
  role: "ADMIN" | "USER";
}

const INITIAL_FORM_DATA: InviteUserFormData = {
  name: "",
  email: "",
  department: "",
  position: "",
  role: "USER",
};

export function InviteUserModal({ onClose }: InviteUserModalProps) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { mutate: inviteUser, isPending } = useAdminUserInvite();

  const handleChange = <K extends keyof InviteUserFormData>(
    field: K,
    value: InviteUserFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.email.trim()) {
      return;
    }

    inviteUser(
      {
        email: formData.email.trim(),
        role: "USER",
      },
      {
        onSuccess: () => {
          alert(`${formData.email}로 초대 메일을 발송했습니다.`);
          onClose();
        },
        onError: (error) => {
          alert(
            error instanceof Error ? error.message : "초대에 실패했습니다.",
          );
        },
      },
    );
  };

  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      title="신규 조직원 초대"
      submitLabel="등록하기"
      onSubmit={handleSubmit}
      isSubmitLoading={isPending}
      isSubmitDisabled={!formData.email.trim()}
      containerClassName="max-w-[480px] p-10"
    >
      <div className="space-y-5">
        <p className="text-body-7 text-gray-800">
          초대된 사용자는 시스템 가입 메일을 받게 됩니다. 가입 전까지 상태는
          &apos;대기중&apos;으로 표시됩니다.
        </p>

        <OrgUserFormFields formData={formData} onChange={handleChange} />
      </div>
    </BaseModal>
  );
}
