"use client";

import { useState } from "react";
import { User } from "@/entities/user/model/types";
import { Button, Modal } from "@/shared/ui";
import { ChevronLeftIcon, WarningIcon } from "@/shared/icons";
import { useWithdraw } from "@/entities/user/api/use-withdraw";

interface AccountDeletionProps {
  user: User;
  onBack: () => void;
}

export function AccountDeletion({ user, onBack }: AccountDeletionProps) {
  const [emailInput, setEmailInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending } = useWithdraw();

  const isEmailMatched = emailInput === user.email;
  const isDeleteDisabled = !isEmailMatched;

  const handleActualDelete = () => {
    mutate();
  };

  return (
    <div className="w-full flex flex-col flex-1 gap-9">
      <header className="flex items-center justify-between w-full">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center border border-gray-700/50 rounded-full cursor-pointer"
        >
          <ChevronLeftIcon />
        </button>
        <h1 className="text-heading-5 text-gray-900">계정 삭제</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <div className="space-y-4 text-body-6 text-gray-900">
        <p>
          계정 삭제를 진행하기 전에 잠시 시간을 내어 내 데이터에 어떤 일이
          발생하게 될지 확인해 주시기 바랍니다.
        </p>
        <p className="pl-4 whitespace-pre-line">
          프로필 세부 정보, 선호 설정, 기타 설정이 삭제됩니다.{`\n`}검색 기록 및
          공유한 기타 모든 콘텐츠가 삭제됩니다.{`\n`}계정 삭제 후 30일이 지나면
          모든 데이터가 영구적으로 삭제됩니다.
        </p>
        <p>
          정말 계정 삭제를 원하시는지 확인하기 위해 아래에 이메일 주소를 다시
          입력해 주세요.
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-body-6 text-gray-600">
          사용자 이메일 주소
        </label>
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="w-full text-heading-6 text-gray-900 border border-gray-400 rounded-[10px] p-4 focus:outline-none focus:border-primary-400 transition-colors"
          placeholder="이메일을 입력하세요"
        />
      </div>

      <div className="mt-auto w-full pt-6">
        <Button
          disabled={isDeleteDisabled}
          className="w-full"
          onClick={() => setIsModalOpen(true)}
        >
          계정 삭제
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleActualDelete}
        submitLabel="삭제하기"
        isSubmitLoading={isPending}
      >
        <div className="flex flex-col items-center gap-4">
          <WarningIcon />
          <div className="space-y-1">
            <h3 className="text-heading-5 text-gray-900 text-center">
              정말 계정을 삭제하시겠습니까?
            </h3>
            <p className="text-body-6 text-gray-800 text-center whitespace-pre-line">
              계정을 삭제하면 다시 로그인해도{`\n`}이전 활동 기록은 보실 수
              없습니다.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
