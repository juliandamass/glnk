"use client";

import dynamic from "next/dynamic";

import { HcpRoleColorMap } from "@/constants/hcp";
import { IHcp } from "@/types/hcp.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { ForceGraphMethods } from "react-force-graph-2d";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <p>Loading graph...</p>,
});

interface ConnectionsGraphProps {
  activeHcp: IHcp;
  onNodeClick?: (node: IHcp) => void;
}

const ConnectionsGraph = ({
  activeHcp,
  onNodeClick,
}: ConnectionsGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<ForceGraphMethods>(null);

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  const [graphSize, setGraphSize] = useState<
    | {
        width: number | undefined;
        height: number | undefined;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    import("../../../public/files/mock_hcp_graph_data.json").then((data) => {
      setGraphData(data.default as any);
    });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const currentWidth = containerRef.current.offsetWidth;
      const currentHeight = containerRef.current.offsetHeight;

      setGraphSize({
        width: currentWidth,
        height: currentHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (!graphRef.current || !activeHcp?.id || !graphData.nodes.length) return;

    const node: any = graphData.nodes.find((n: any) => n.id === activeHcp.id);
    if (node && node.x !== undefined && node.y !== undefined) {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(7);
    }
  }, [graphData, activeHcp]);

  const setGraphRef = useCallback((element: ForceGraphMethods | null) => {
    if (element) {
      graphRef.current = element;
      element.zoom(7, 1000);
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-white">
      {graphSize?.width && graphSize.height ? (
        <ForceGraph2D
          ref={setGraphRef as any}
          width={graphSize.width}
          height={graphSize.height}
          graphData={graphData}
          nodeLabel={(node: any) => {
            if (node.role === "researcher") {
              return `
                Name: ${node.name}
                Role: ${node.role}
                Location: ${node.address}
                Headline: ${node.headline ?? "N/A"}
                Peers: ${node.peers ?? "-"}
                Success Rate: ${node.successRate ?? "-"}%
              `;
            } else {
              return node.name;
            }
          }}
          linkLabel="label"
          nodeCanvasObject={(node: any, context) => {
            if (typeof window === "undefined") return;

            const size = 6;

            const img = new window.Image();
            img.src = node.images || "/images/placeholder.jpg";

            const borderColor = HcpRoleColorMap[node.role];

            context.fillStyle = borderColor;

            context.beginPath();
            context.arc(node.x, node.y, size + 0.5, 0, 21 * Math.PI, false);
            context.fill();

            context.save();
            context.beginPath();
            context.arc(node.x, node.y, size, 0, 21 * Math.PI, false);
            context.clip();
            context.drawImage(
              img,
              node.x - size,
              node.y - size,
              size * 2,
              size * 2,
            );
            context.restore();
          }}
          onNodeClick={(node) => {
            if (onNodeClick) {
              if (node.role === "researcher") {
                onNodeClick(node as any);
              }
            }
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ConnectionsGraph;
