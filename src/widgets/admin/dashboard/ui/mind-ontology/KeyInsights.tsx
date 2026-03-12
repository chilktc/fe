"use client";

const INSIGHTS = [
  {
    title: "번아웃과 업무과중이 강하게 연결되어 있습니다",
    description:
      "정서적 소진 관련 키워드가 업무량 키워드와 함께 자주 언급됩니다. 업무 배분과 리소스 재검토가 필요할 수 있습니다.",
  },
  {
    title: "리더십 관련 불만이 이번 달 증가하고 있습니다",
    description:
      "피드백, 인정, 평가 관련 키워드가 지난달 대비 23% 증가했습니다. 매니저 교육이나 1:1 미팅 품질 개선을 고려해보세요.",
  },
  {
    title: "이직 고민과 성장정체가 함께 나타나고 있습니다",
    description:
      "커리어 발전 기회 부족이 이직 의도로 이어지고 있습니다. 내부 성장 경로나 교육 프로그램 강화가 도움이 될 수 있습니다.",
  },
];

export function KeyInsights() {
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-[10px] p-6 space-y-10">
      <div>
        <h2 className="text-heading-5 text-gray-900">주요 인사이트</h2>
        <p className="text-body-6 text-gray-600">관리자를 위한 핵심 요약</p>
      </div>

      <div className="flex flex-col gap-3">
        {INSIGHTS.map((insight, idx) => (
          <div
            key={idx}
            className="p-5 rounded-[10px] border border-gray-400 bg-gray-200"
          >
            <h3 className="text-label-1 text-primary-400 mb-1">
              {insight.title}
            </h3>
            <p className="text-body-7 text-gray-600 leading-relaxed">
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
