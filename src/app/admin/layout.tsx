"use client";

import { usePathname } from "next/navigation";
import { AdminGuard } from "@/features/auth/ui/admin-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="flex flex-col">
      <main className="flex-1 flex flex-col min-h-0 relative">
        {isLoginPage ? children : <AdminGuard>{children}</AdminGuard>}
      </main>
    </div>
  );
}
