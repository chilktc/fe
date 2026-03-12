import { ChevronLeftIcon } from "@/shared/icons";

interface MyPageHeaderProps {
  onBack: () => void;
  title: string;
  eyebrow?: string;
}

export function MyPageHeader({ onBack, title, eyebrow }: MyPageHeaderProps) {
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
      <div className="w-10" /> {/* Spacer */}
    </header>
  );
}
