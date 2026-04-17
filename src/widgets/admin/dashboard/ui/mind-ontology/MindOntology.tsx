"use client";

import { useOrganizationGraphData } from "@/features/admin/organization-graph";
import { MindOntologyHeader } from "./MindOntologyHeader";
import { KeywordClusterMap } from "./KeywordClusterMap";
import { CategoryDistribution } from "./CategoryDistribution";
import { ConnectedKeywords } from "./ConnectedKeywords";

export function MindOntology() {
  const { data, isLoading, isError, error } = useOrganizationGraphData();
  const errorMessage =
    isError || !data
      ? error instanceof Error
        ? error.message
        : "데이터를 불러오지 못했습니다."
      : null;

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto">
      <MindOntologyHeader />

      <div className="flex flex-col gap-7.5">
        <KeywordClusterMap
          graphData={data?.graphData}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />

        <div className="grid grid-cols-2 gap-7.5">
          <CategoryDistribution
            categories={data?.categoryDistribution}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
          <ConnectedKeywords
            items={data?.connectedKeywords}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
}
