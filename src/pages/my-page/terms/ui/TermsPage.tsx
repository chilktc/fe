import { useSessionStore } from "@/entities/session/model/store";
import { useAppRouter } from "@/shared/lib/router";
import { PagePanel } from "@/shared/ui";
import { PageHeader } from "@/widgets/my-page";

export function TermsPage() {
  const router = useAppRouter();
  const user = useSessionStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <PagePanel panelClassName="gap-4">
      <PageHeader onBack={router.back} title="서비스 이용 약관" />
      <div className="flex-1 flex flex-col w-full px-2.5 overflow-y-auto">
        <p className="text-gray-800 text-body-6 whitespace-pre-line">
          본 약관은 [Bloom]이 제공하는 [Bloom]의 이용과 관련하여 회사와 이용자
          간의 권리, 의무 및 책임사항을 규정합니다.
        </p>
        <br />
        <p>...</p>
      </div>
    </PagePanel>
  );
}
