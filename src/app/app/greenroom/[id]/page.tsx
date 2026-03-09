"use client";

import { use } from "react";
import { useGreenroom } from "@/entities/greenroom/api/use-greenroom";
import { GreenroomLoading, Greenroom } from "@/widgets/greenroom";
import { useState } from "react";
import { useSessionStore } from "@/entities/session/model/store";
import { AuthGuard } from "@/features/auth/ui/auth-guard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GreenroomDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { data, isLoading } = useGreenroom(id);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSessionStore((state) => state.user);

  if (!user) return null;

  return (
    <AuthGuard>
      <div className="relative bg-gray-100 overflow-x-hidden flex flex-col h-full overflow-y-auto scrollbar-hide">
        {/* 메인 컨텐츠 */}
        <main className="flex-1 flex flex-col">
          {isLoading ? (
            <GreenroomLoading />
          ) : (
            data?.data && <Greenroom data={data.data} />
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
