import { SignupForm } from '@/features/auth/ui/signup-form';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="z-10 w-full max-w-md items-center justify-between font-mono text-sm">
        <SignupForm />
      </div>
    </div>
  );
}
