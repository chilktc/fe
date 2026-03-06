import { AuthGuard } from "@/features/auth/ui/auth-guard";
import { TermsCard } from "@/widgets/login";

export default function TermsPage() {
  return (
    <AuthGuard>
      <main className="w-full flex items-center justify-center bg-gray-100 px-5 py-6">
        <TermsCard />
      </main>
    </AuthGuard>
  );
}
