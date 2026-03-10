"use client";

import { use } from "react";
import { useGreenroom } from "@/entities/greenroom/api/use-greenroom";
import { GreenroomLoading, Greenroom } from "@/widgets/greenroom";
import { useSessionStore } from "@/entities/session/model/store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GreenroomPage({ params }: PageProps) {
  const { id } = use(params);
  const { data, isLoading } = useGreenroom(id);

  const user = useSessionStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="relative bg-gray-100 flex-1 min-h-dvh w-full overflow-hidden flex flex-col">
      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col">
        {isLoading ? (
          <GreenroomLoading />
        ) : (
          data?.data && <Greenroom data={data.data} />
        )}
      </main>
    </div>
  );
}
