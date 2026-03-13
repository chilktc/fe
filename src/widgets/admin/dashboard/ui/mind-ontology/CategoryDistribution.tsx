"use client";

import DonutChart from "./DonutChartView";

const CATEGORIES = [
  { name: "업무구조", count: 38, color: "bg-[#3B82F6]" },
  { name: "리더십", count: 32, color: "bg-[#8B5CF6]" },
  { name: "동료관계", count: 21, color: "bg-[#F59E0B]" },
  { name: "커리어성장", count: 26, color: "bg-[#10B981]" },
  { name: "조직문화제도", count: 24, color: "bg-[#EC4899]" },
  { name: "정서적소진", count: 45, color: "bg-[#92400E]" },
];

export function CategoryDistribution() {
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-[10px] p-6 space-y-10">
      <div>
        <h2 className="text-heading-5 text-gray-900">카테고리 분포</h2>
        <p className="text-body-6 text-gray-600">우려사항 유형별 비율</p>
      </div>

      <DonutChart categories={CATEGORIES} />
    </div>
  );
}
