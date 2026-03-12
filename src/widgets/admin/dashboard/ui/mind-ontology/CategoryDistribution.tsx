"use client";

const CATEGORIES = [
  { name: "업무 구조", count: 38, percent: 20, color: "bg-blue-400" },
  { name: "리더십", count: 32, percent: 17, color: "bg-purple-400" },
  { name: "동료 관계", count: 21, percent: 11, color: "bg-yellow-400" },
  { name: "커리어 성장", count: 26, percent: 14, color: "bg-green-400" },
  { name: "정서적 소진", count: 45, percent: 24, color: "bg-orange-400" },
  { name: "조직문화 제도", count: 24, percent: 13, color: "bg-pink-400" },
];

export function CategoryDistribution() {
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-[10px] p-6 space-y-10">
      <div>
        <h2 className="text-heading-5 text-gray-900">카테고리 분포</h2>
        <p className="text-body-6 text-gray-600">우려사항 유형별 비율</p>
      </div>

      <div className="relative w-40 h-40 mx-auto">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#232425"
            strokeWidth="4"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#60A5FA"
            strokeWidth="4"
            strokeDasharray="20 80"
            strokeDashoffset="0"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#A78BFA"
            strokeWidth="4"
            strokeDasharray="17 83"
            strokeDashoffset="-20"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#FBBF24"
            strokeWidth="4"
            strokeDasharray="11 89"
            strokeDashoffset="-37"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#34D399"
            strokeWidth="4"
            strokeDasharray="14 86"
            strokeDashoffset="-48"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#FB923C"
            strokeWidth="4"
            strokeDasharray="24 76"
            strokeDashoffset="-62"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="#F472B6"
            strokeWidth="4"
            strokeDasharray="13 87"
            strokeDashoffset="-86"
          />
        </svg>
      </div>

      <div className="flex-1 space-y-2">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
              <span className="text-caption-1 text-gray-900 group-hover:text-primary-400 transition-colors">
                {cat.name}
              </span>
            </div>
            <span className="text-caption-1 text-gray-800 font-medium">
              {cat.count}건
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
