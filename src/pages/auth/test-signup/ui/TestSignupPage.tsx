import { TestSignupForm } from "@/features/auth/ui/test-signup-form";

export function TestSignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="z-10 w-full max-w-md items-center justify-between font-mono text-sm">
        <TestSignupForm />
      </div>
    </div>
  );
}
