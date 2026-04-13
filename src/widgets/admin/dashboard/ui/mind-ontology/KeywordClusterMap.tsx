import { GRAPH_GROUP_META } from "@/entities/graph/model/constants";
import { GraphData } from "@/entities/graph/model/types";
import { ParkIcon } from "@/shared/icons";
import { GraphView } from "./GraphView";
import { PanelState } from "./PanelState";

interface KeywordClusterMapProps {
  graphData?: GraphData;
  isLoading?: boolean;
  errorMessage?: string | null;
}

const LEGEND_ITEMS = Object.values(GRAPH_GROUP_META);

export function KeywordClusterMap({
  graphData,
  isLoading = false,
  errorMessage,
}: KeywordClusterMapProps) {
  const hasNodes = (graphData?.nodes.length ?? 0) > 0;
  const hasLinks = (graphData?.links.length ?? 0) > 0;

  return (
    <div className="bg-gray-100 border border-gray-400 rounded-[10px] flex flex-col gap-7">
      <div className="flex items-center justify-between py-4 px-6">
        <h2 className="text-heading-5 text-gray-900 flex items-center gap-2">
          <ParkIcon />
          키워드 클러스터 맵
        </h2>

        {/* Legend Placeholder */}
        <div className="flex items-center gap-4">
          {LEGEND_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 text-caption-1 text-gray-800"
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex-1 border-gray-400/30 rounded-xl flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <PanelState message="키워드 클러스터를 불러오는 중입니다." />
        ) : errorMessage ? (
          <PanelState
            message={`키워드 클러스터를 불러오지 못했습니다.\n잠시 후 다시 시도해주세요.`}
          />
        ) : !hasNodes ? (
          <PanelState message="표시할 키워드 클러스터 데이터가 없습니다." />
        ) : !hasLinks ? (
          <PanelState message="연결된 키워드 데이터가 없어 클러스터 맵을 그릴 수 없습니다." />
        ) : (
          <GraphView graphData={graphData as GraphData} />
        )}
      </div>
    </div>
  );
}
