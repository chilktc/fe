"use client";

import { AuthGuard } from "@/features/auth/ui/auth-guard";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard>{children}</AuthGuard>;
}
