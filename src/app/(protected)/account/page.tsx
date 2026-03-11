"use client";

import { useState } from "react";
import { useSessionStore } from "@/entities/session/model/store";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useUpdateProfile } from "@/entities/user/api/update-profile";

export default function AccountPage() {
  const user = useSessionStore((state) => state.user);
  const router = useRouter();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const { mutate, isPending } = useUpdateProfile();

  if (!user) {
    return null;
  }

  const isChanged = nickname !== user.nickname && nickname.trim() !== "";
  const isDisabled = !isChanged || isPending;

  const handleSave = () => {
    if (isDisabled) return;
    mutate(
      { nickname },
      {
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  };

  return (
    <div className="relative min-h-dvh flex flex-col">
      <div className="flex-1 mt-8 bg-gray-200 border-t border-gray-400 flex flex-col items-center gap-10 px-4 py-6 rounded-t-2xl">
        {/* 이메일 */}
        <div className="py-10 flex flex-col items-center space-y-3">
          <p className="text-label-1 text-gray-900">{user.email}</p>
        </div>

        {/* 프로필 수정 폼 */}
        <div className="w-full space-y-8 flex-1">
          <div className="space-y-1">
            <label className="block text-body-6 text-gray-600 px-0.5">
              사용자 이름
            </label>
            <div className="relative">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full border border-[#55585D] rounded-[10px] p-4 text-white focus:outline-none focus:border-[#F8B4CA] transition-colors"
                placeholder={user.nickname}
              />
            </div>
          </div>

          {/* 저장 및 취소 버튼 */}
          <div className="flex flex-col space-y-3 pt-2">
            <Button
              onClick={handleSave}
              disabled={isDisabled}
              className={`${
                isDisabled
                  ? "bg-gray-400 text-gray-800"
                  : "bg-primary-400 text-gray-900"
              }`}
            >
              {isPending ? "저장 중..." : "프로필 저장"}
            </Button>
            <button
              onClick={() => router.back()}
              className="text-button-1 self-center text-gray-800 cursor-pointer py-2"
            >
              취소
            </button>
          </div>
        </div>

        {/* 계정 삭제 버튼 */}
        <div className="mt-auto w-full max-w-sm border-t border-gray-400">
          <button className="text-button-1 w-full py-4 flex items-center justify-center space-x-2 text-accent-red cursor-pointer">
            <span>계정 삭제</span>
          </button>
        </div>
      </div>
    </div>
  );
}
