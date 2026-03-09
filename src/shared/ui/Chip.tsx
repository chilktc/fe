import { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}

export function Chip({
  selected = false,
  className = "",
  ...props
}: ChipProps) {
  const baseStyles =
    "flex items-center justify-center px-1.5 py-1 rounded-[6px] transition-colors inline text-caption-2";

  return (
    <div
      className={`${baseStyles} ${selected ? "bg-primary-700 text-primary-400" : "bg-gray-800 text-gray-400"} ${className}`}
      {...props}
    >
      {props.children}
    </div>
  );
}
