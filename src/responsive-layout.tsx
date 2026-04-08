"use client";

import { usePathname } from "@/shared/lib/router";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  if (isAdminPath) {
    return (
      <div className="w-full min-h-dvh flex flex-col relative">{children}</div>
    );
  }

  return (
    <div className="w-full max-w-[480px] mx-auto min-h-dvh bg-gray-100 flex flex-col shadow-2xl relative">
      {children}
    </div>
  );
}
