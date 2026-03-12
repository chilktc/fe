"use client";

import { useRouter } from "next/navigation";
import { MyPageHeader } from "@/widgets/header";
import { useSessionStore } from "@/entities/session/model/store";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const user = useSessionStore((state) => state.user);

  const onBack = () => {
    router.back();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-dvh flex flex-col">
      <div className="flex-1 mt-8 bg-gray-200 border-t border-gray-400 flex flex-col items-center gap-4 p-4 rounded-t-2xl">
        <MyPageHeader onBack={onBack} title="개인정보 보호정책" />
        <div className="flex-1 flex flex-col w-full px-2.5 overflow-y-auto">
          <p className="text-gray-800 text-body-6 whitespace-pre-line">
            본 개인정보 보호정책은 [Bloom] (이하 “회사”)가 제공하는 [Bloom]
            (이하 “회사”) 이용과 관련하여 이용자의 개인정보를 어떻게 수집, 이용,
            보관 및 보호하는지에 대해 설명합니다.
          </p>
          <br />
          <p>...</p>
        </div>
      </div>
    </div>
  );
}
