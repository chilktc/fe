"use client";

import { MindOntologyHeader } from "./MindOntologyHeader";
import { KeywordClusterMap } from "./KeywordClusterMap";
import { CategoryDistribution } from "./CategoryDistribution";
import { ConnectedKeywords } from "./ConnectedKeywords";
import { KeyInsights } from "./KeyInsights";

export function MindOntology() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto">
      <MindOntologyHeader />

      <div className="flex flex-col gap-7.5">
        <KeywordClusterMap />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7.5">
          <CategoryDistribution />
          <ConnectedKeywords />
        </div>

        <KeyInsights />
      </div>
    </div>
  );
}
