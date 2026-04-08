import { useSessionStore } from "@/entities/session/model/store";
import { useAppRouter } from "@/shared/lib/router";
import { PagePanel } from "@/shared/ui";
import { PageHeader } from "@/widgets/my-page";

export function PrivacyPolicyPage() {
  const router = useAppRouter();
  const user = useSessionStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <PagePanel panelClassName="gap-4">
      <PageHeader onBack={router.back} title="개인정보 보호정책" />
      <div className="flex-1 flex flex-col w-full px-2.5 overflow-y-auto">
        <p className="text-gray-800 text-body-6 whitespace-pre-line">
          본 개인정보 보호정책은 [Bloom] (이하 “회사”)가 제공하는 [Bloom]
          (이하 “회사”) 이용과 관련하여 이용자의 개인정보를 어떻게 수집, 이용,
          보관 및 보호하는지에 대해 설명합니다.
        </p>
        <br />
        <p>...</p>
      </div>
    </PagePanel>
  );
}
