import { useState } from "react";
import { AuthGuard } from "@/features/auth/ui/auth-guard";
import { AgreementDetailModal, TermsCard } from "@/widgets/auth/login";
import type { AgreementContentKey } from "@/widgets/auth/login/ui/agreement-content";

export function TermsPage() {
  const [openedAgreement, setOpenedAgreement] =
    useState<AgreementContentKey | null>(null);

  return (
    <AuthGuard>
      <div className="relative min-h-dvh w-full bg-gray-100">
        <main className="w-full flex items-center justify-center bg-gray-100 px-5 py-10">
          {!openedAgreement && (
            <TermsCard onOpenAgreement={setOpenedAgreement} />
          )}
        </main>

        <AgreementDetailModal
          agreementKey={openedAgreement}
          onClose={() => setOpenedAgreement(null)}
        />
      </div>
    </AuthGuard>
  );
}
