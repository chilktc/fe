"use client";

import { GraphData } from "@/entities/graph/model/types";
import { GRAPH_GROUP_META } from "@/entities/graph/model/constants";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

const ForceGraph2D = lazy(() => import("react-force-graph-2d"));

type GraphNodeCanvas = {
  name?: string;
  group?: string;
  weight?: number;
  x?: number;
  y?: number;
};

function getNodeRadius(weight?: number) {
  if ((weight ?? 0) >= 0.8) return 12;
  if ((weight ?? 0) >= 0.3) return 8;
  return 4;
}

interface GraphViewProps {
  graphData: GraphData;
}

export const GraphView = ({ graphData }: GraphViewProps) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const element = graphRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      setDimensions({
        width: width || 800,
        height: height || 500,
      });
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-[500px] overflow-hidden" ref={graphRef}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-4">
            Loading Graph...
          </div>
        }
      >
        <ForceGraph2D
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="#191a1b"
          nodeCanvasObject={(node: GraphNodeCanvas, ctx, globalScale) => {
            const label = node.name ?? "";
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;

            const x = node.x ?? 0;
            const y = node.y ?? 0;
            const r = getNodeRadius(node.weight);

            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI, false);
            ctx.fillStyle =
              GRAPH_GROUP_META[node.group as keyof typeof GRAPH_GROUP_META]
                ?.color || "#9ca3af";
            ctx.fill();

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#e5e7eb";
            ctx.fillText(label, x, y + r + fontSize + 2);
          }}
          nodePointerAreaPaint={(node: GraphNodeCanvas, color, ctx) => {
            const x = node.x ?? 0;
            const y = node.y ?? 0;
            const r = getNodeRadius(node.weight);

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI, false);
            ctx.fill();
          }}
          linkColor={() => "#374151"}
          linkWidth={1}
          d3VelocityDecay={0.3}
          cooldownTicks={100}
          enableZoomInteraction={false}
          enablePanInteraction={false}
        />
      </Suspense>
    </div>
  );
};
