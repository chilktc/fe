"use client";

import { TrackingDetail } from "@/entities/tracking/model/types";
import { Card, Chip } from "@/shared/ui";

interface StepProps {
  data: TrackingDetail;
  selection: string | null;
  onSelect: (value: string) => void;
}

export function Step({ data, selection, onSelect }: StepProps) {
  return (
    <div className="space-y-8 px-4 pb-3">
      <h2 className="text-heading-3 text-gray-900">
        해당 고민, 지금은 어떤가요?
      </h2>
      <div className="space-y-3">
        <div className="bg-gray-200 rounded-2xl border border-gray-400 p-3 space-y-3">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-caption-1 text-gray-800">{data.date}</span>
              <div className="flex gap-[5px]">
                {data.type.map((t) => (
                  <Chip key={t} selected>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>

            <h3 className="text-heading-6 text-gray-900">{data.title}</h3>
          </div>
          <p className="text-body-5 text-gray-800 whitespace-pre-wrap">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card
            className="flex flex-col items-center justify-center gap-2.5 h-25 px-4 py-2.5 text-label-1"
            onClick={() => onSelect("not-solved")}
            isSelected={selection === "not-solved"}
            isDimmed={selection !== null && selection !== "not-solved"}
          >
            <span>🔒</span>
            <span>아직 해결 안됐어요</span>
          </Card>

          <Card
            className="flex flex-col items-center justify-center gap-2.5 h-25 px-4 py-2.5 text-label-1"
            onClick={() => onSelect("solved")}
            isSelected={selection === "solved"}
            isDimmed={selection !== null && selection !== "solved"}
          >
            <span>🎉</span>
            <span>해결 됐어요</span>
          </Card>
        </div>
      </div>
    </div>
  );
}
