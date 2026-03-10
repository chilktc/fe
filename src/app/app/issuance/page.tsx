"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/widgets/sidebar";
import { Header } from "@/widgets/header";
import { TicketIssuance } from "@/widgets/ticket-issuance";
import { useSessionStore } from "@/entities/session/model/store";

export default function IssuancePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSessionStore((state) => state.user);
  const router = useRouter();

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
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 px-4 z-10 flex flex-col min-h-0">
        <TicketIssuance />
      </main>
    </div>
  );
}
