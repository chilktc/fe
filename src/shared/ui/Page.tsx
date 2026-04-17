import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface PageProps extends PropsWithChildren {
  className?: string;
}

interface PagePanelProps extends PropsWithChildren {
  className?: string;
  panelClassName?: string;
}

interface PageLoadingProps {
  label?: ReactNode;
  className?: string;
}

export function Page({ children, className }: PageProps) {
  return <div className={cn("relative min-h-dvh flex flex-col", className)}>{children}</div>;
}

export function PagePanel({
  children,
  className,
  panelClassName,
}: PagePanelProps) {
  return (
    <Page className={className}>
      <div
        className={cn(
          "flex-1 mt-8 bg-gray-200 border-t border-gray-400 flex flex-col items-center p-4 rounded-t-2xl",
          panelClassName,
        )}
      >
        {children}
      </div>
    </Page>
  );
}

export function PageLoading({
  label = "불러오는 중...",
  className,
}: PageLoadingProps) {
  return (
    <div className={cn("min-h-dvh flex items-center justify-center", className)}>
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400" />
        <p>{label}</p>
      </div>
    </div>
  );
}
