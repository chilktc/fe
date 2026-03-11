"use client";

import { Card } from "@/shared/ui";

interface SelectionStepProps {
  title: string;
  options: readonly string[];
  selection: string | null;
  onSelect: (value: string) => void;
}

export function SelectionStep({
  title,
  options,
  selection,
  onSelect,
}: SelectionStepProps) {
  return (
    <div className="space-y-8 px-4 pb-3">
      <h2 className="text-heading-3 text-gray-900">{title}</h2>

      <div className="space-y-3">
        {options.map((option) => (
          <Card
            key={option}
            onClick={() => onSelect(option)}
            className="h-16 px-4 py-2.5 flex items-center"
            isSelected={selection === option}
            isDimmed={selection !== null && selection !== option}
          >
            <span className="text-body-6">{option}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
