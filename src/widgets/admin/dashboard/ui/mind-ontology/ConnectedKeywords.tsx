"use client";

import { ConnectedKeywordItem } from "@/features/admin/organization-graph";
import { GRAPH_GROUP_META } from "@/entities/graph/model/constants";
import { Chip } from "@/shared/ui";
import { Fragment } from "react/jsx-runtime";
import { PanelState } from "./PanelState";

interface ConnectedKeywordsProps {
  items?: ConnectedKeywordItem[];
  isLoading?: boolean;
  errorMessage?: string | null;
}

export function ConnectedKeywords({
  items,
  isLoading = false,
  errorMessage,
}: ConnectedKeywordsProps) {
  const getTagStyle = (group: string) => ({
    backgroundColor:
      GRAPH_GROUP_META[group as keyof typeof GRAPH_GROUP_META]?.color ||
      "#9ca3af",
  });

  return (
    <div className="bg-gray-100 border border-gray-400 rounded-[10px] p-6 space-y-10">
      <div>
        <h2 className="text-heading-5 text-gray-900">자주 연결된 키워드</h2>
        <p className="text-body-6 text-gray-600">함께 언급되는 우려사항 조합</p>
      </div>

      {isLoading ? (
        <PanelState message="자주 연결된 키워드를 불러오는 중입니다." />
      ) : errorMessage ? (
        <PanelState
          message={`자주 연결된 키워드를 불러오지 못했습니다. (${errorMessage})`}
        />
      ) : !items || items.length === 0 ? (
        <PanelState message="표시할 연결 키워드 데이터가 없습니다." />
      ) : (
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-200 border border-gray-400 rounded-[10px] p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {[
                    { label: item.source, group: item.sourceGroup },
                    { label: item.target, group: item.targetGroup },
                  ].map((tag, tagIndex) => (
                    <Fragment key={`${tag.label}-${tagIndex}`}>
                      <span className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-gray-300 px-2.5 align-middle text-label-1 text-gray-900">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={getTagStyle(tag.group)}
                        />
                        {tag.label}
                      </span>
                      {tagIndex === 0 && (
                        <span className="text-label-1 text-gray-600">+</span>
                      )}
                    </Fragment>
                  ))}
                </div>
                <Chip className="text-caption-1! bg-transparent! text-gray-800!">
                  {item.count}회
                </Chip>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
