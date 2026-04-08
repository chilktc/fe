import { TestLoginForm } from "@/features/auth/ui/test-login-form";

export function TestLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-4">
        <TestLoginForm />
      </div>
    </div>
  );
}
