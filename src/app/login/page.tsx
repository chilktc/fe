'use client';

import { LoginForm } from '@/features/auth/ui/login-form';
import { GuestGuard } from '@/features/auth/ui/guest-guard';

export default function LoginPage() {
  return (
    <GuestGuard>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50/50 to-transparent blur-3xl -z-10" />
        <main className="relative z-10 w-full max-w-md">
          <LoginForm />
        </main>
      </div>
    </GuestGuard>
  );
}
