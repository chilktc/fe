"use client";

import { use } from "react";
import { PodcastChoice } from "@/widgets/greenroom";
import { useSessionStore } from "@/entities/session/model/store";
import { AuthGuard } from "@/features/auth/ui/auth-guard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GreenroomPodcastChoicePage({ params }: PageProps) {
  const { id } = use(params);
  const user = useSessionStore((state) => state.user);

  if (!user) return null;

  return (
    <AuthGuard>
      <div className="relative bg-gray-100 overflow-x-hidden flex flex-col h-full overflow-y-auto scrollbar-hide">
        {/* 메인 컨텐츠 */}
        <main className="flex-1 flex flex-col">
          <PodcastChoice id={id} />
        </main>
      </div>
    </AuthGuard>
  );
}
