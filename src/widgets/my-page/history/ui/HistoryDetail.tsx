"use client";

import { useState } from "react";
import { useAppRouter } from "@/shared/lib/router";
import { useHistoryDetail } from "@/features/my-page/history";
import { TicketTab } from "./detail/TicketTab";
import { PodcastTab } from "./detail/PodcastTab";
import { TrackingTab } from "./detail/TrackingTab";
import { PageHeader } from "@/widgets/my-page";

interface HistoryDetailProps {
  id: string;
}

export function HistoryDetail({ id }: HistoryDetailProps) {
  const router = useAppRouter();
  const { data, isLoading } = useHistoryDetail(id);
  const [activeTab, setActiveTab] = useState<"ticket" | "podcast" | "tracking">(
    "ticket",
  );

  const onBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-200 h-dvh flex justify-center items-center">
        <p className="text-gray-900">불러오는 중...</p>
      </div>
    );
  }

  const history = data?.data;

  if (!history) {
    return (
      <div className="p-4 bg-gray-200 h-dvh flex justify-center items-center">
        <p className="text-gray-900">데이터를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const formattedDate = new Date(history.ticket.createdAt).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    },
  );

  const tabs = [
    { id: "ticket", label: "입장권" },
    { id: "podcast", label: "팟캐스트" },
    { id: "tracking", label: "트래킹" },
  ] as const;

  return (
    <div className="w-full relative h-full flex flex-col overflow-hidden">
      <div className="flex flex-col gap-4 h-full">
        <PageHeader
          onBack={onBack}
          title={history.ticket.name}
          eyebrow={formattedDate}
        />

        {/* Tab Menu */}
        <div className="flex h-9.5 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? "text-primary-400 border-b-2 border-primary-400 text-heading-6"
                  : "text-gray-400 text-body-3 border-b border-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content - Scrollable area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {activeTab === "ticket" && <TicketTab ticket={history.ticket} />}
          {activeTab === "podcast" && <PodcastTab podcast={history.podcast} />}
          {activeTab === "tracking" && (
            <TrackingTab
              tracking={history.tracking}
              createdAt={history.ticket.createdAt}
            />
          )}
        </div>
      </div>
    </div>
  );
}
