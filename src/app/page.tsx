'use client';

import { useState } from 'react';
import { ProfileButton } from '@/entities/user/ui';
import { Sidebar } from '@/widgets/sidebar';
import { TicketIssuance } from '@/widgets/ticket-issuance';
import { useSessionStore } from '@/entities/session/model/store';
import { AuthGuard } from '@/features/auth/ui/auth-guard';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSessionStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <AuthGuard>
      <div className="relative flex min-h-dvh flex-col bg-[#1A1A1A] overflow-x-hidden">
        {/* 사이드바 */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)} 
          user={user}
        />

        {/* 네비게이션/헤더 */}
        <header className="fixed top-0 left-0 right-0 p-4 flex items-center max-w-[480px] mx-auto z-30">
          <ProfileButton 
            onClick={() => setIsSidebarOpen(true)} 
            profileImage={user?.profileImage}
          />
        </header>

        {/* 메인 컨텐츠 */}
        {/* <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
          <TicketIssuance />
        </main> */}
      </div>
    </AuthGuard>
  );
}
