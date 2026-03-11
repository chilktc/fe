import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
  isDimmed?: boolean;
  children: ReactNode;
}

export function Card({
  isSelected = false,
  isDimmed = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const baseStyles = " rounded-[10px] cursor-pointer transition-all";
  const selectionStyles = isSelected
    ? "ring-primary-400 ring-2 bg-primary-200"
    : "ring-gray-400 ring-1 bg-gray-200";
  const dimStyles = isDimmed ? "opacity-50" : "opacity-100";

  return (
    <div
      className={`${baseStyles} ${selectionStyles} ${dimStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
