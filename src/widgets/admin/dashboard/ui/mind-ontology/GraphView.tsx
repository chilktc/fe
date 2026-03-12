"use client";

import { GraphData } from "@/entities/graph/model/types";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

// Dynamically import ForceGraph2D to avoid SSR issues with window object
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-4">Loading Graph...</div>
  ),
});

const DUMMY_DATA: GraphData = {
  nodes: [
    // Blue: 업무구조
    { id: "b1", name: "업무과중", group: "work_structure", val: 100 },
    { id: "b2", name: "야근", group: "work_structure", val: 50 },
    { id: "b3", name: "마감압박", group: "work_structure", val: 50 },
    { id: "b4", name: "리소스부족", group: "work_structure", val: 20 },
    { id: "b5", name: "우선순위혼란", group: "work_structure", val: 20 },
    { id: "b6", name: "협업혼란", group: "work_structure", val: 20 },
    { id: "b7", name: "역할모호", group: "work_structure", val: 20 },
    { id: "b8", name: "회의", group: "work_structure", val: 20 },

    // Purple: 리더십
    { id: "p1", name: "상사압박", group: "leadership", val: 100 },
    { id: "p2", name: "인정부족", group: "leadership", val: 50 },
    { id: "p3", name: "피드백부족", group: "leadership", val: 50 },
    { id: "p4", name: "권위주의", group: "leadership", val: 20 },
    { id: "p5", name: "평가불만", group: "leadership", val: 20 },

    // Yellow: 동료관계
    { id: "y1", name: "갈등", group: "peer_relations", val: 100 },
    { id: "y2", name: "뒷담화", group: "peer_relations", val: 50 },
    { id: "y3", name: "책임전가", group: "peer_relations", val: 20 },
    { id: "y4", name: "소외감", group: "peer_relations", val: 20 },

    // Green: 커리어성장
    { id: "g1", name: "업무과중", group: "career_growth", val: 100 },
    { id: "g2", name: "성장정체", group: "career_growth", val: 50 },
    { id: "g3", name: "방향성", group: "career_growth", val: 20 },
    { id: "g4", name: "역량불안", group: "career_growth", val: 20 },

    // Pink: 조직문화제도
    { id: "pk1", name: "복지불만", group: "culture_system", val: 100 },
    { id: "pk2", name: "연차눈치", group: "culture_system", val: 20 },
    { id: "pk3", name: "평가제도", group: "culture_system", val: 20 },
    { id: "pk4", name: "보상불만", group: "culture_system", val: 20 },

    // Brown: 정서적소진
    { id: "br1", name: "번아웃", group: "emotional_exhaustion", val: 100 },
    { id: "br2", name: "무기력", group: "emotional_exhaustion", val: 50 },
    { id: "br3", name: "불만", group: "emotional_exhaustion", val: 20 },
    { id: "br4", name: "스트레스", group: "emotional_exhaustion", val: 20 },
    { id: "br5", name: "감정소모", group: "emotional_exhaustion", val: 20 },
  ],
  links: [
    // b links
    { source: "b1", target: "b2" },
    { source: "b1", target: "b3" },
    { source: "b1", target: "b4" },
    { source: "b2", target: "b5" },
    { source: "b2", target: "b6" },
    { source: "b2", target: "b7" },
    { source: "b7", target: "b8" },

    // p links
    { source: "p1", target: "p2" },
    { source: "p1", target: "p3" },
    { source: "p3", target: "p4" },
    { source: "p3", target: "p5" },

    // y links
    { source: "y1", target: "y2" },
    { source: "y1", target: "y3" },
    { source: "y2", target: "y4" },

    // g links
    { source: "g1", target: "g2" },
    { source: "g1", target: "g3" },
    { source: "g2", target: "g4" },

    // pk links
    { source: "pk1", target: "pk2" },
    { source: "pk1", target: "pk3" },
    { source: "pk1", target: "pk4" },

    // br links
    { source: "br1", target: "br2" },
    { source: "br2", target: "br3" },
    { source: "br2", target: "br4" },
    { source: "br2", target: "br5" },

    // Bridge links
    { source: "b1", target: "p1" },
    { source: "b1", target: "g1" },
    { source: "g1", target: "pk1" },
    { source: "p1", target: "y1" },
    { source: "y1", target: "br1" },
    { source: "br1", target: "pk1" },
  ],
};

const COLORS: Record<string, string> = {
  work_structure: "#3B82F6",
  leadership: "#8B5CF6",
  peer_relations: "#F59E0B",
  career_growth: "#10B981",
  culture_system: "#EC4899",
  emotional_exhaustion: "#92400E",
};

export const GraphView = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    setGraphData(DUMMY_DATA);
    setDimensions({
      width: graphRef.current?.clientWidth || 800,
      height: graphRef.current?.clientHeight || 500,
    });

    const handleResize = () => {
      setDimensions({
        width: graphRef.current?.clientWidth || 800,
        height: graphRef.current?.clientHeight || 500,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-[500px] overflow-hidden" ref={graphRef}>
      <ForceGraph2D
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#191a1b"
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;

          // Circle
          ctx.beginPath();
          const r = Math.sqrt(node.val || 10) * 1.5;
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = COLORS[node.group] || "#9ca3af";
          ctx.fill();

          // Label
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#e5e7eb";
          ctx.fillText(label, node.x, node.y + r + fontSize + 2);
        }}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          ctx.fillStyle = color;
          const r = Math.sqrt(node.val || 10) * 1.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        linkColor={() => "#374151"}
        linkWidth={1}
        d3VelocityDecay={0.3}
        cooldownTicks={100}
        enableZoomInteraction={false}
        enablePanInteraction={false}
      />
    </div>
  );
};
