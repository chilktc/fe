"use client";

interface PanelStateProps {
  message: string;
}

export function PanelState({ message }: PanelStateProps) {
  return (
    <div className="flex min-h-[240px] items-center justify-center px-6 py-10 text-center text-body-6 text-gray-500 whitespace-break-spaces">
      {message}
    </div>
  );
}
