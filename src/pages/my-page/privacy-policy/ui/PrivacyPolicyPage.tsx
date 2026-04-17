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
        <div className="text-gray-800 text-body-6 space-y-5 pb-6">
          <p>
            본 개인정보 보호정책은 [Bloom] (이하 &quot;회사&quot;)가 제공하는
            [Bloom] 이용과 관련하여 이용자의 개인정보를 어떻게 수집, 이용, 보관
            및 보호하는지에 대해 설명합니다.
          </p>

          <section className="space-y-2">
            <h2 className="font-semibold">1. 수집하는 개인정보 항목</h2>
            <p>
              회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수
              있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>회원가입 시: 이메일 주소, 비밀번호, 닉네임</li>
              <li>
                서비스 이용 과정에서 자동 수집: 접속 IP 주소, 기기 정보(OS,
                브라우저 종류), 쿠키 정보, 이용 기록(접속 일시, 사용 기능, 로그
                데이터)
              </li>
              <li>
                선택 입력 정보: 프로필 이미지, 사용자 설정 정보, 서비스 내 작성
                콘텐츠
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">2. 개인정보의 수집 및 이용 목적</h2>
            <p>회사는 다음 목적을 위해 개인정보를 이용합니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>회원 식별 및 계정 관리</li>
              <li>서비스 제공 및 기능 개선</li>
              <li>사용자 문의 응대</li>
              <li>서비스 품질 개선 및 통계 분석</li>
              <li>부정 이용 방지 및 보안 관리</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">3. 개인정보의 보유 및 이용 기간</h2>
            <p>
              회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당
              정보를 지체 없이 파기합니다.
            </p>
            <p>
              단, 관계 법령에 따라 일정 기간 보관이 필요한 경우 다음과 같이
              보관합니다.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>계약 또는 청약철회 기록: 5년</li>
              <li>대금 결제 및 재화 공급 기록: 5년</li>
              <li>소비자 불만 또는 분쟁 처리 기록: 3년</li>
              <li>로그 기록: 3개월</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">4. 개인정보의 제3자 제공</h2>
            <p>회사는 이용자의 개인정보를 외부에 제공하지 않습니다.</p>
            <p>다만, 다음의 경우 예외로 합니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령에 따라 제출 의무가 있는 경우</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">5. 개인정보의 처리 위탁</h2>
            <p>
              회사는 원활한 서비스 제공을 위해 일부 업무를 외부 업체에 위탁할 수
              있습니다.
            </p>
            <p>
              위탁 시 관련 법령에 따라 개인정보가 안전하게 관리되도록
              감독합니다.
            </p>
            <p>(예: 클라우드 서버 운영, 결제 시스템 제공 등)</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">6. 이용자의 권리</h2>
            <p>이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>개인정보 열람 요청</li>
              <li>개인정보 수정 요청</li>
              <li>개인정보 삭제 요청</li>
              <li>처리 정지 요청</li>
            </ul>
            <p>
              요청은 고객센터 이메일([contact@email.com])을 통해 접수할 수
              있습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">7. 개인정보의 파기 절차 및 방법</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>전자적 파일 형태: 복구 불가능한 방법으로 영구 삭제</li>
              <li>출력물 형태: 분쇄 또는 소각</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">
              8. 개인정보 보호를 위한 기술적·관리적 조치
            </h2>
            <p>회사는 개인정보 보호를 위해 다음 조치를 시행합니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>암호화 저장</li>
              <li>접근 권한 제한</li>
              <li>정기 보안 점검</li>
              <li>내부 보안 교육 실시</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold">9. 개인정보 보호책임자</h2>
            <p>이름: [담당자명]</p>
            <p>이메일: [이메일 주소]</p>
          </section>

          <p>
            본 개인정보 보호정책은 법령 및 서비스 변경에 따라 수정될 수 있으며,
            변경 시 서비스 내 공지합니다.
          </p>
        </div>
      </div>
    </PagePanel>
  );
}
