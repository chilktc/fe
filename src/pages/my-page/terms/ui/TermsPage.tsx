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
        <div className="text-gray-800 text-body-6 space-y-5 pb-6">
          <p>
            본 약관은 [Bloom]이 제공하는 [Bloom]의 이용과 관련하여 회사와 이용자
            간의 권리, 의무 및 책임사항을 규정합니다.
          </p>

          <section className="space-y-2">
            <h2 className="font-semibold">제1조 (목적)</h2>
            <p>
              본 약관은 회사가 제공하는 서비스의 이용 조건 및 절차, 권리·의무 및
              책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">제2조 (서비스의 제공)</h2>
            <p>회사는 다음과 같은 서비스를 제공합니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>사용자 고민 입력 및 AI 기반 유사 사례 추천 기능</li>
              <li>사용자 맞춤 솔루션 제안 기능</li>
              <li>기타 회사가 정하는 서비스</li>
            </ul>
            <p>회사는 운영상 필요에 따라 서비스의 내용을 변경할 수 있습니다.</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">제3조 (회원 가입)</h2>
            <p>이용자는 본 약관에 동의함으로써 회원 가입을 신청합니다.</p>
            <p>회사는 신청 내용을 검토 후 승낙합니다.</p>
            <p>허위 정보 제공 시 서비스 이용이 제한될 수 있습니다.</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">제4조 (회원의 의무)</h2>
            <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>타인의 정보 도용</li>
              <li>서비스 운영 방해</li>
              <li>불법적 콘텐츠 게시</li>
              <li>저작권 침해 행위</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">제5조 (지적 재산권)</h2>
            <p>서비스에 대한 모든 지적 재산권은 회사에 귀속됩니다.</p>
            <p>
              이용자가 작성한 콘텐츠의 저작권은 이용자에게 있으며, 회사는 서비스
              운영 목적 범위 내에서 이를 사용할 수 있습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">제6조 (서비스 이용 제한)</h2>
            <p>
              회사는 약관 위반 행위가 확인될 경우 서비스 이용을 제한하거나
              계정을 삭제할 수 있습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">제7조 (면책 조항)</h2>
            <p>
              회사는 천재지변 또는 불가항력으로 인한 서비스 중단에 대해 책임을
              지지 않습니다.
            </p>
            <p>
              회사는 이용자가 게시한 콘텐츠로 인한 분쟁에 직접적인 책임을 지지
              않습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">제8조 (분쟁 해결)</h2>
            <p>
              본 약관과 관련한 분쟁은 대한민국 법률에 따르며, 관할 법원은 회사
              소재지를 관할하는 법원으로 합니다.
            </p>
          </section>
        </div>
      </div>
    </PagePanel>
  );
}
