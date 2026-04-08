"use client";

import { useState } from "react";
import { User } from "@/entities/user/model/types";
import { Button } from "@/shared/ui";
import { useAppRouter } from "@/shared/lib/router";
import { useUpdateProfile } from "@/features/my-page/profile";

interface ProfileEditProps {
  user: User;
  onDeleteClick: () => void;
}

export function ProfileEdit({ user, onDeleteClick }: ProfileEditProps) {
  const router = useAppRouter();
  const [nickname, setNickname] = useState(user.nickname || "");
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const {
    mutate,
    isPending,
    error,
    reset: resetUpdateError,
  } = useUpdateProfile();
  const trimmedNickname = nickname.trim();
  const isNicknameLengthValid =
    trimmedNickname.length >= 2 && trimmedNickname.length <= 15;
  const nicknameValidationMessage =
    hasTriedSubmit && trimmedNickname.length > 0 && !isNicknameLengthValid
      ? "사용자 이름은 2자 이상 15자 이하만 가능합니다."
      : null;
  const isNicknameChanged = trimmedNickname !== user.nickname;
  const isNicknameDisabled =
    !isNicknameChanged || !isNicknameLengthValid || isPending;

  const handleSave = () => {
    setHasTriedSubmit(true);
    if (isNicknameDisabled) return;
    mutate(
      { nickname: trimmedNickname },
      {
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  };

  return (
    <>
      {/* 이메일 */}
      <div className="py-10 flex flex-col items-center space-y-3">
        <p className="text-label-1 text-gray-900">{user.email}</p>
      </div>

      {/* 프로필 수정 폼 */}
      <div className="w-full space-y-10 flex-1">
        <div className="space-y-1">
          <label className="block text-body-6 text-gray-600 px-0.5">
            사용자 이름
          </label>
          <div className="relative">
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                if (error) {
                  resetUpdateError();
                }
                if (hasTriedSubmit) {
                  setHasTriedSubmit(false);
                }
                setNickname(e.target.value);
              }}
              className="w-full border border-[#55585D] rounded-[10px] p-4 text-white focus:outline-none focus:border-[#F8B4CA] transition-colors"
              placeholder={user.nickname}
            />
          </div>
          {nicknameValidationMessage ? (
            <p className="text-body-6 text-accent-red px-0.5">
              {nicknameValidationMessage}
            </p>
          ) : null}
          {!nicknameValidationMessage && error instanceof Error ? (
            <p className="text-body-6 text-accent-red px-0.5">
              {error.message}
            </p>
          ) : null}
        </div>

        {/* 저장 및 취소 버튼 */}
        <div className="flex flex-col space-y-3 pt-2">
          <Button
            onClick={handleSave}
            disabled={isNicknameDisabled}
            className={`${
              isNicknameDisabled
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
        <button
          onClick={onDeleteClick}
          className="text-button-1 w-full py-4 flex items-center justify-center space-x-2 text-accent-red cursor-pointer"
        >
          <span>계정 삭제</span>
        </button>
      </div>
    </>
  );
}
