"use client";

import { AdminGuestGuard } from "@/features/auth/ui/admin-guest-guard";
import { AuthError } from "@/features/auth/ui/auth-error";
import { LogoHorizontal } from "@/shared/assets/logo";
import { AdminLoginCard } from "@/widgets/admin/login";

export default function AdminLoginPage() {
  return (
    <AdminGuestGuard>
      <div className="space-y-12">
        <header className="px-6 py-2.5 w-full bg-gray-100 border-b border-gray-400 flex items-center shrink-0">
          <LogoHorizontal className="h-9" />
        </header>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-[480px] space-y-4">
            <AuthError />
            <AdminLoginCard />
          </div>
        </div>
      </div>
    </AdminGuestGuard>
  );
}
