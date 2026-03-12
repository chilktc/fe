"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdminSidebar } from "@/widgets/admin/dashboard";
import { OrgAccountManagement } from "@/widgets/admin/dashboard";

function AdminPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "org-account";

  return (
    <div className="flex h-full overflow-hidden bg-gray-50 min-w-[1300px]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-10">
        {tab === "org-account" && <OrgAccountManagement />}
        {tab === "mind-ontology" && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-body-4">
              마인드 온톨로지 준비 중입니다.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense>
      <AdminPageContent />
    </Suspense>
  );
}
