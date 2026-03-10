"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/widgets/sidebar";
import { Header } from "@/widgets/header";
import { useSessionStore } from "@/entities/session/model/store";
import { Button } from "@/shared/ui";

export default function AppPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSessionStore((state) => state.user);
  const router = useRouter();

  const handleEnter = useCallback(() => {
    router.push("/issuance");
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className="relative bg-[#1A1A1A] flex-1 flex flex-col min-h-dvh w-full overflow-hidden">
      {/* 사이드바 */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
      />

      {/* 네비게이션/헤더 */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 px-4 z-10 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col items-center justify-between pb-5">
          <div className="flex-1 w-full flex flex-col justify-center">
            <h1 className="text-body-1 text-gray-800">
              {user.nickname}님, 안녕하세요
              <br />
              <span className="text-heading-4 text-gray-900">
                어떤 고민을 하고 계신가요?
              </span>
            </h1>
          </div>
          <Button className="w-full" onClick={handleEnter}>
            고민 나누기
          </Button>
        </div>
      </main>
    </div>
  );
}
