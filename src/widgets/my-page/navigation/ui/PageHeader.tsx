import type { ReactNode } from "react";
import { ChevronLeftIcon } from "@/shared/icons";

interface PageHeaderProps {
  onBack: () => void;
  title: string;
  eyebrow?: string;
  rightAction?: ReactNode;
}

export function PageHeader({
  onBack,
  title,
  eyebrow,
  rightAction,
}: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between w-full">
      <button
        onClick={onBack}
        className="shrink-0 w-10 h-10 flex items-center justify-center border border-gray-700/50 rounded-full cursor-pointer"
      >
        <ChevronLeftIcon />
      </button>
      <div className="min-w-0 flex-1 flex flex-col items-center px-3">
        {eyebrow && (
          <p className="max-w-full truncate text-caption-1 text-gray-800">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-full truncate text-heading-5 text-gray-900">
          {title}
        </h1>
      </div>
      <div className="shrink-0 w-10 flex justify-end">{rightAction}</div>
    </header>
  );
}
