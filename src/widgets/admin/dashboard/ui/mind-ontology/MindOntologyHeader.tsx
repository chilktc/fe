"use client";

import { ChevronDownIcon, NetworkIcon } from "@/shared/icons";

export function MindOntologyHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-heading-3 text-gray-900 flex items-center gap-2.5">
          <span className="text-primary-400">
            <NetworkIcon />
          </span>
          조직 키워드 인사이트
        </h1>
        <p className="text-body-7 text-gray-500">
          사용자 사용내역을 바탕으로 추출된 조직 전체의 핵심 키워드
          네트워크입니다
        </p>
      </div>

      <button className="flex items-center gap-2 bg-primary-400 rounded-sm p-2 text-label-2 text-gray-900">
        2026.02
        <ChevronDownIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
