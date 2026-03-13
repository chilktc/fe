"use client";

import { Chip } from "@/shared/ui";
import { Fragment } from "react/jsx-runtime";

const COMBINATIONS = [
  {
    tags: ["번아웃", "업무과중", "인원부족"],
    count: 5,
    color: ["bg-[#8A4C00]", "bg-[#2D8FFF]", "bg-[#A855F7]"],
  },
  {
    tags: ["갈등", "책임전가", "연차눈치"],
    count: 4,
    color: ["bg-[#FFCC01]", "bg-[#FFCC01]", "bg-[#EF476F]"],
  },
  {
    tags: ["이직", "성장정체", "방향성"],
    count: 6,
    color: ["bg-[#22C55E]", "bg-[#22C55E]", "bg-[#22C55E]"],
  },
  {
    tags: ["야근", "마감압박", "스트레스"],
    count: 7,
    color: ["bg-[#2D8FFF]", "bg-[#2D8FFF]", "bg-[#8A4C00]"],
  },
];

export function ConnectedKeywords() {
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-[10px] p-6 space-y-10">
      <div>
        <h2 className="text-heading-5 text-gray-900">자주 연결된 키워드</h2>
        <p className="text-body-6 text-gray-600">함께 언급되는 우려사항 조합</p>
      </div>

      <div className="space-y-4">
        {COMBINATIONS.map((combo, idx) => (
          <div
            key={idx}
            className="bg-gray-200 border border-gray-400 rounded-[10px] p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {combo.tags.map((tag, tIdx) => (
                  <Fragment key={tIdx}>
                    <span
                      className={`px-2.5 h-8 flex items-center rounded-md text-label-1 text-gray-100 ${combo.color[tIdx]}`}
                    >
                      {tag}
                    </span>
                    {combo.tags.length - 1 !== tIdx && (
                      <span className="text-label-1 text-gray-600">+</span>
                    )}
                  </Fragment>
                ))}
              </div>
              <Chip className="text-caption-1!">{combo.count}회</Chip>
            </div>
            <p className="text-label-3 text-gray-600">
              이 키워드 조합이 {combo.count}회 함께 언급되었습니다
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
