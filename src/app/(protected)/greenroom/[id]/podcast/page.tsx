"use client";

import { use } from "react";
import { GreenroomLoading, Podcast } from "@/widgets/greenroom";
import { useSessionStore } from "@/entities/session/model/store";
import { usePodcast } from "@/entities/greenroom/api/use-podcast";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PodcastPage({ params }: PageProps) {
  const { id } = use(params);
  const { data, isLoading } = usePodcast(id);

  const user = useSessionStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="relative bg-gray-100 flex-1 flex flex-col min-h-dvh w-full overflow-hidden">
      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col min-h-0 w-full">
        {isLoading ? (
          <GreenroomLoading />
        ) : (
          data?.data && <Podcast data={data.data} />
        )}
      </main>
    </div>
  );
}
