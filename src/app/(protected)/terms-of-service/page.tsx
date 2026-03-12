"use client";

import { useRouter } from "next/navigation";
import { MyPageHeader } from "@/widgets/header";
import { useSessionStore } from "@/entities/session/model/store";

export default function TermsOfServicePage() {
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
        <MyPageHeader onBack={onBack} title="서비스 이용 약관" />
        <div className="flex-1 flex flex-col w-full px-2.5 overflow-y-auto">
          <p className="text-gray-800 text-body-6 whitespace-pre-line">
            본 약관은 [Bloom]이 제공하는 [Bloom]의 이용과 관련하여 회사와 이용자
            간의 권리, 의무 및 책임사항을 규정합니다.
          </p>
          <br />
          <p>...</p>
        </div>
      </div>
    </div>
  );
}
