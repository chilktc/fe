"use client";

import { GuestGuard } from "@/features/auth/ui/guest-guard";
import { LoginCard } from "@/widgets/login";
import { AuthError } from "@/features/auth/ui/auth-error";

export default function LoginPage() {
  return (
    <GuestGuard>
      <main className="relative w-full flex flex-col items-start justify-center px-5 py-6 space-y-2.5">
        <LoginCard />
        <AuthError />
      </main>
    </GuestGuard>
  );
}
