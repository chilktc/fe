"use client";

import { ParkIcon } from "@/shared/icons";
import { GraphView } from "./GraphView";

export function KeywordClusterMap() {
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-[10px] flex flex-col gap-7">
      <div className="flex items-center justify-between py-4 px-6">
        <h2 className="text-heading-5 text-gray-900 flex items-center gap-2">
          <ParkIcon />
          키워드 클러스터 맵
        </h2>

        {/* Legend Placeholder */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6]" /> 업무구조
          </div>
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" /> 리더십
          </div>
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B]" /> 동료관계
          </div>
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" /> 커리어성장
          </div>
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-[#EC4899]" /> 조직문화재도
          </div>
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-[#92400E]" /> 정서적소진
          </div>
        </div>
      </div>

      <div className="w-full flex-1 border-gray-400/30 rounded-xl flex items-center justify-center overflow-hidden">
        <GraphView />
      </div>
    </div>
  );
}
