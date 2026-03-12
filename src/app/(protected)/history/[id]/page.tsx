"use client";

import { use } from "react";
import { HistoryDetail } from "@/widgets/history";

export default function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="relative h-dvh flex flex-col overflow-hidden">
      <div className="flex-1 mt-8 bg-gray-200 border-t border-gray-400 flex flex-col items-center p-4 rounded-t-2xl overflow-hidden min-h-0">
        <HistoryDetail id={id} />
      </div>
    </div>
  );
}
