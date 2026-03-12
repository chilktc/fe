"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdminSidebar } from "@/widgets/admin/dashboard";
import { OrgAccountManagement, MindOntology } from "@/widgets/admin/dashboard";

function AdminPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "org-account";

  return (
    <div className="flex h-full overflow-hidden bg-gray-50 min-w-[1300px]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-10">
        {tab === "org-account" && <OrgAccountManagement />}
        {tab === "mind-ontology" && <MindOntology />}
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
