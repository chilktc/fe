import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

// bg-[#rrggbb] 에서 hex 추출
function toHex(color: string): string {
  const match = color.match(/^bg-\[(\#[0-9a-fA-F]{3,8})\]$/);
  return match ? match[1] : "#9ca3af";
}

export interface Category {
  name: string;
  count: number;
  color: string;
}

interface DonutChartProps {
  categories: Category[];
}

export default function DonutChart({ categories }: DonutChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const total = categories.reduce((s, d) => s + d.count, 0);
  const hoveredItem = hovered !== null ? categories[hovered] : null;

  const data = categories.map((d, i) => ({
    title: d.name,
    value: d.count,
    color: toHex(d.color),
    opacity: hovered === null || hovered === i ? 1 : 0.1,
    isActive: hovered === i,
  }));

  return (
    <div className="space-y-4">
      <div className="max-w-[250px] mx-auto">
        {/* 차트 */}
        <div className="relative">
          <PieChart
            data={data}
            lineWidth={38}
            paddingAngle={1}
            startAngle={-90}
            animate
            label={({ dataEntry }) => {
              const pct = Math.round(dataEntry.percentage);
              return pct >= 7 ? `${pct}%` : "";
            }}
            labelStyle={(i) => ({
              fill: "#fff",
              fontSize: "5px",
              fontWeight: 600,
              pointerEvents: "none",
              opacity: data[i].opacity,
            })}
            labelPosition={80}
            segmentsStyle={(i) => ({
              opacity: data[i].opacity,
              transition: "opacity 0.2s, transform 0.2s",
              cursor: "pointer",
            })}
            onMouseOver={(_, i) => setHovered(i)}
            onMouseOut={() => setHovered(null)}
          />

          {/* 중앙 텍스트 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-[110px]">
            {hoveredItem && (
              <>
                <div className="text-label-3 text-gray-400 mb-0.5">
                  {hoveredItem.name}
                </div>
                <div
                  className="text-body-1"
                  style={{ color: toHex(hoveredItem.color) }}
                >
                  {Math.round((hoveredItem.count / total) * 100)}%
                </div>
                <div className="text-caption-2 text-gray-400 mt-0.5">
                  {hoveredItem.count}건
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 범례 */}
      <div className="flex-1 space-y-2">
        {data.map((cat, i) => {
          const active = hovered === i;

          return (
            <div
              key={cat.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center justify-between transition-opacity cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span
                  className={`text-body-7 ${active ? "text-primary-400" : "text-gray-700 "}`}
                >
                  {cat.title}
                </span>
              </div>

              <span
                className={`text-label-1 ${active ? "text-primary-400" : "text-gray-800"}`}
              >
                {cat.value}건
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
