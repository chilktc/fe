"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MyPageHeader } from "@/widgets/header";
import { useSessionStore } from "@/entities/session/model/store";
import { Switch, Divide } from "@/shared/ui";

export default function NotificationsPage() {
  const router = useRouter();
  const user = useSessionStore((state) => state.user);

  const [responseNotified, setResponseNotified] = useState(true);
  const [trackingNotified, setTrackingNotified] = useState(true);

  const onBack = () => {
    router.back();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-dvh flex flex-col">
      <div className="flex-1 mt-8 bg-gray-200 border-t border-gray-400 flex flex-col items-center gap-4 p-4 rounded-t-2xl">
        <MyPageHeader onBack={onBack} title="알림" />

        <div className="w-full flex flex-col pt-4">
          <Divide className="bg-gray-400" />

          {/* 응답 알림 */}
          <div className="flex items-center justify-between py-2.5 px-4">
            <div className="flex flex-col gap-1">
              <span className="text-heading-6 text-gray-900 font-bold">
                응답
              </span>
              <span className="text-label-2 text-gray-800">
                입장권 제출 후 팟캐스트가 생성되면 알려드려요
              </span>
            </div>
            <Switch checked={responseNotified} onChange={setResponseNotified} />
          </div>

          <Divide className="bg-gray-400" />

          {/* 고민 해결 트래킹 알림 */}
          <div className="flex items-center justify-between py-2.5 px-4">
            <div className="flex flex-col gap-1">
              <span className="text-heading-6 text-gray-900 font-bold">
                고민 해결 트래킹
              </span>
              <span className="text-label-2 text-gray-800">
                상담 일주일 후, 해결 여부와 변화를 체크해드려요
              </span>
            </div>
            <Switch checked={trackingNotified} onChange={setTrackingNotified} />
          </div>

          <Divide className="bg-gray-400" />
        </div>
      </div>
    </div>
  );
}
