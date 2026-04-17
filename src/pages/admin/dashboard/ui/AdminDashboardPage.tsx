import { Suspense } from "react";
import { useQueryParams } from "@/shared/lib/router";
import {
  AdminHeader,
  MindOntology,
  OrgAccountManagement,
} from "@/widgets/admin/dashboard";

function AdminDashboardContent() {
  const searchParams = useQueryParams();
  const activeTab = searchParams.get("tab") || "org-account";

  return (
    <div className="min-h-dvh min-w-[1300px] bg-gray-50">
      <AdminHeader />
      <main className="min-h-dvh px-10 py-10 pt-[104px]">
        {activeTab === "org-account" && <OrgAccountManagement />}
        {activeTab === "mind-ontology" && <MindOntology />}
      </main>
    </div>
  );
}

export function AdminDashboardPage() {
  return (
    <Suspense>
      <AdminDashboardContent />
    </Suspense>
  );
}
