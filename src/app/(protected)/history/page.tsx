"use client";

import { useSessionStore } from "@/entities/session/model/store";
import { HistoryList } from "@/widgets/history";

export default function HistoryPage() {
  const user = useSessionStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-dvh flex flex-col">
      <div className="flex-1 mt-8 bg-gray-200 border-t border-gray-400 flex flex-col items-center gap-10 p-4 rounded-t-2xl">
        <HistoryList />
      </div>
    </div>
  );
}
