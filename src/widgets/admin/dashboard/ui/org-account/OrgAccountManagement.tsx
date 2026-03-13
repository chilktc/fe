"use client";

import { InviteSection } from "./InviteSection";
import { UserListSection } from "./UserListSection";

export function OrgAccountManagement() {
  return (
    <div className="flex flex-col gap-10 px-5">
      {/* Header */}
      <div>
        <h1 className="text-heading-3 text-gray-900">조직계정관리</h1>
        <p className="text-body-7 text-gray-800">
          조직원의 계정을 관리하고 권한을 설정하세요
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {/* Invite Section */}
        <InviteSection />

        {/* User List */}
        <UserListSection />
      </div>
    </div>
  );
}
