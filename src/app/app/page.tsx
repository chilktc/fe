"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sidebar } from "@/widgets/sidebar";
import { TicketIssuance } from "@/widgets/ticket-issuance";
import { useSessionStore } from "@/entities/session/model/store";
import { AuthGuard } from "@/features/auth/ui/auth-guard";
import { Button } from "@/shared/ui";
import { MenuIcon } from "@/shared/icons";

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSessionStore((state) => state.user);
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get("step");

  const isIssuance = step === "issuance";

  const handleEnter = useCallback(() => {
    router.push("/app?step=issuance");
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className="relative bg-[#1A1A1A] overflow-x-hidden flex flex-col h-full">
      {/* 사이드바 */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
      />

      {/* 네비게이션/헤더 */}
      <header className="sticky top-0 left-0 right-0 h-20 p-4 flex items-center justify-center z-30 pointer-events-none bg-[#1A1A1A] shrink-0">
        <div
          className="absolute left-4 hover:cursor-pointer pointer-events-auto"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </div>
        <h1 className="text-xl font-extralight text-primary-400 leading-[1.3] text-center">
          Bloom
        </h1>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 px-4 z-10 flex flex-col min-h-0">
        {!isIssuance ? (
          <div className="flex-1 flex flex-col items-center justify-between pt-8 pb-5">
            <div className="w-full">
              <h1 className="text-xl font-extralight text-gray-900 leading-[1.3]">
                안녕하세요
                <br />
                {user.nickname}님
                <br />
                고민이 있으신가요?
              </h1>
            </div>
            <Button className="w-full" onClick={handleEnter}>
              입장하기
            </Button>
          </div>
        ) : (
          <TicketIssuance />
        )}
      </main>
    </div>
  );
}

export default function AppPage() {
  return (
    <AuthGuard>
      <Suspense fallback={<div className="h-full w-full bg-[#1A1A1A]" />}>
        <AppContent />
      </Suspense>
    </AuthGuard>
  );
}
