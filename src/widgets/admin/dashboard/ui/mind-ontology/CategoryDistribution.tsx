"use client";

import { OrganizationGraphCategory } from "@/features/admin/organization-graph";
import DonutChart from "./DonutChartView";
import { PanelState } from "./PanelState";

interface CategoryDistributionProps {
  categories?: OrganizationGraphCategory[];
  isLoading?: boolean;
  errorMessage?: string | null;
}

export function CategoryDistribution({
  categories,
  isLoading = false,
  errorMessage,
}: CategoryDistributionProps) {
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-[10px] p-6 space-y-10">
      <div>
        <h2 className="text-heading-5 text-gray-900">카테고리 분포</h2>
        <p className="text-body-6 text-gray-600">우려사항 유형별 비율</p>
      </div>

      {isLoading ? (
        <PanelState message="카테고리 분포를 불러오는 중입니다." />
      ) : errorMessage ? (
        <PanelState
          message={`키워드 클러스터를 불러오지 못했습니다.\n잠시 후 다시 시도해주세요.`}
        />
      ) : !categories || categories.length === 0 ? (
        <PanelState message="표시할 카테고리 분포 데이터가 없습니다." />
      ) : (
        <DonutChart categories={categories} />
      )}
    </div>
  );
}
