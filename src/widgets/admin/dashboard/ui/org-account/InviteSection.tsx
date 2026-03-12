"use client";

import { useState } from "react";
import { MailIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { useAdminUserInvite } from "@/entities/admin/api/use-admin-users";

export function InviteSection() {
  const [email, setEmail] = useState("");
  const { mutate: inviteUser, isPending } = useAdminUserInvite();

  const handleInvite = () => {
    if (!email) return;
    inviteUser(
      { email, role: "USER" },
      {
        onSuccess: () => {
          alert(`${email}로 초대 메일을 발송했습니다.`);
          setEmail("");
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
    <div className="bg-gray-100 border border-gray-400 rounded-[10px] p-7.5 flex gap-25">
      {/* Left */}
      <div className="min-w-0 space-y-2.5">
        <MailIcon />
        <h3 className="text-heading-5 text-gray-900">신규 조직원 초대</h3>
        <p className="text-label-3 text-gray-800">
          초대된 사용자는 시스템 가입 메일을 받게 됩니다.
          <br />
          가입 전까지 상태는 '대기중'으로 표시됩니다.
        </p>
      </div>

      {/* Right */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="space-y-1">
          <div className="text-heading-6 text-gray-800">이메일 주소</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInvite()}
            placeholder="name@company.com"
            disabled={isPending}
            className="w-full h-10 bg-transparent border border-gray-400 rounded-[10px] px-4 py-2.5 text-body-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors disabled:opacity-50"
          />
        </div>
        <Button
          onClick={handleInvite}
          disabled={!email || isPending}
          className="w-full h-10! text-button-2! transition-colors cursor-pointer"
        >
          {isPending ? "발송 중..." : "이메일 등록 및 초대"}
        </Button>
      </div>
    </div>
  );
}
