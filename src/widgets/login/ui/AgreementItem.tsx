"use client";

import { CheckSquare } from "@/shared/ui";

interface AgreementItemProps {
  label: string;
}

export function AgreementItem({ label }: AgreementItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1 flex items-center space-x-2 hover:cursor-pointer">
        <CheckSquare className="w-6 h-6" />
        <span className="text-body-5 text-gray-900">{label}</span>
      </div>
      <button className="text-caption-1 text-gray-800 underline hover:cursor-pointer hover:text-gray-900">
        보기
      </button>
    </div>
  );
}
