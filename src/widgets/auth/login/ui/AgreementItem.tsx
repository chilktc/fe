import { CheckSquare } from "@/shared/ui/CheckSquare";

interface AgreementItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onView: () => void;
}

export function AgreementItem({
  label,
  checked,
  onToggle,
  onView,
}: AgreementItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div
        onClick={onToggle}
        className="flex-1 flex items-center space-x-2 hover:cursor-pointer"
      >
        <CheckSquare className="w-6 h-6" isActive={checked} />
        <span className="text-body-5 text-gray-900">{label}</span>
      </div>
      <button
        type="button"
        onClick={onView}
        className="text-caption-1 text-gray-800 underline hover:cursor-pointer hover:text-gray-900"
      >
        보기
      </button>
    </div>
  );
}
