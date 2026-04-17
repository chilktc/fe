"use client";

import { GraphData } from "@/entities/graph/model/types";
import { GRAPH_GROUP_META } from "@/entities/graph/model/constants";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { ForceGraphMethods } from "react-force-graph-2d";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const forceGraphRef = useRef<ForceGraphMethods | undefined>(undefined);
  const hasFittedInitiallyRef = useRef(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  const fitGraphToViewport = () => {
    if (!graphData.nodes.length) return;

    window.requestAnimationFrame(() => {
      forceGraphRef.current?.zoomToFit(500, 80);
    });
  };

  useEffect(() => {
    const element = containerRef.current;
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

  useEffect(() => {
    if (!graphData.nodes.length || !dimensions.width || !dimensions.height)
      return;
    if (hasFittedInitiallyRef.current) return;

    hasFittedInitiallyRef.current = true;
    fitGraphToViewport();
  }, [graphData.nodes.length, dimensions.width, dimensions.height]);

  return (
    <div
      className="relative h-[min(72vh,680px)] min-h-[500px] w-full overflow-hidden"
      ref={containerRef}
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-4">
            Loading Graph...
          </div>
        }
      >
        <div className="pointer-events-none absolute right-4 bottom-4 z-10 rounded-full bg-gray-600 px-3 py-1.5 text-[11px] text-gray-100">
          휠로 확대/축소, 드래그로 이동
        </div>
        <ForceGraph2D
          ref={forceGraphRef}
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
          minZoom={0.25}
          maxZoom={6}
          enableZoomInteraction
          enablePanInteraction
        />
      </Suspense>
    </div>
  );
};
