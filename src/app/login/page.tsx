"use client";

import { GuestGuard } from "@/features/auth/ui/guest-guard";
import { LoginCard } from "@/widgets/login";

export default function LoginPage() {
  return (
    <GuestGuard>
      <main className="relative w-full flex items-start justify-center px-5 py-6">
        <LoginCard />
      </main>
    </GuestGuard>
  );
}
