import { Suspense } from "react";
import { useQueryParams } from "@/shared/lib/router";
import {
  AdminSidebar,
  MindOntology,
  OrgAccountManagement,
} from "@/widgets/admin/dashboard";

function AdminDashboardContent() {
  const searchParams = useQueryParams();
  const activeTab = searchParams.get("tab") || "org-account";

  return (
    <div className="flex h-full overflow-hidden bg-gray-50 min-w-[1300px]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-10">
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
