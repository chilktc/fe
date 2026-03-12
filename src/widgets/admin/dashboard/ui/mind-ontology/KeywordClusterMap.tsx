"use client";

import { ParkIcon } from "@/shared/icons";

export function KeywordClusterMap() {
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-[10px] min-h-[500px] flex flex-col gap-7">
      <div className="flex items-center justify-between py-4 px-6">
        <h2 className="text-heading-5 text-gray-900 flex items-center gap-2">
          <ParkIcon />
          키워드 클러스터 맵
        </h2>

        {/* Legend Placeholder */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-blue-400" /> 업무구조
          </div>
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-purple-400" /> 리더십
          </div>
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-yellow-400" /> 동료관계
          </div>
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-green-400" /> 커리어상담
          </div>
          <div className="flex items-center gap-1.5 text-caption-1 text-gray-800">
            <div className="w-2 h-2 rounded-full bg-red-400" /> 조직문화재도
          </div>
        </div>
      </div>

      <div className="w-full flex-1 border border-dashed border-gray-400/30 rounded-xl flex items-center justify-center">
        <p className="text-body-7 text-gray-500">키워드 클러스터 맵 준비 중</p>
      </div>
    </div>
  );
}
