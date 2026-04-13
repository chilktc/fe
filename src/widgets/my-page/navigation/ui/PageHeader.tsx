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
        className="w-10 h-10 flex items-center justify-center border border-gray-700/50 rounded-full cursor-pointer"
      >
        <ChevronLeftIcon />
      </button>
      <div className="flex flex-col items-center">
        {eyebrow && <p className="text-caption-1 text-gray-800">{eyebrow}</p>}
        <h1 className="text-heading-5 text-gray-900">{title}</h1>
      </div>
      {rightAction ?? <div className="w-10" />}
    </header>
  );
}
