"use client";

import { useState } from "react";
import { Button } from "@/shared/ui";
import { InviteUserModal } from "./InviteUserModal";
import { UserListSection } from "./UserListSection";
import { PlusIcon } from "@/shared/icons";

export function OrgAccountManagement() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-10 px-5">
      <div className="flex items-start justify-between gap-5">
        <div>
          <h1 className="text-heading-3 text-gray-900">조직계정관리</h1>
          <p className="text-body-7 text-gray-800">
            조직원의 계정을 관리하고 권한을 설정하세요
          </p>
        </div>

        <Button
          onClick={() => setIsInviteModalOpen(true)}
          className="text-button-1 px-4 flex gap-1 items-center justify-center"
        >
          <PlusIcon />
          <span>신규 조직원 등록하기</span>
        </Button>
      </div>

      <div className="flex flex-col gap-2.5">
        <UserListSection />
      </div>

      {isInviteModalOpen && (
        <InviteUserModal onClose={() => setIsInviteModalOpen(false)} />
      )}
    </div>
  );
}
