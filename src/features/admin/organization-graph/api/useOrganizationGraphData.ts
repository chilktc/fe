import { useQuery } from "@tanstack/react-query";
import { GraphData, GraphLink, GraphNode } from "@/entities/graph/model/types";
import {
  GRAPH_GROUP_META,
  GraphGroupKey,
} from "@/entities/graph/model/constants";
import { api } from "@/shared/api/base";
import { unwrapData } from "@/shared/api/response";

const ORGANIZATION_GRAPH_QUERY_KEY = ["admin", "organization-graph"] as const;

interface OrganizationGraphNodeResponse {
  label: string;
  group: string;
  weight: number;
  mention_count: number;
}

interface OrganizationGraphLinkResponse {
  source_label: string;
  target_label: string;
  weight: number;
}

interface OrganizationGraphResponse {
  nodes: OrganizationGraphNodeResponse[];
  links: OrganizationGraphLinkResponse[];
  category_distribution: Record<string, number>;
}

export interface OrganizationGraphCategory {
  key: string;
  name: string;
  count: number;
  color: string;
}

export interface ConnectedKeywordItem {
  source: string;
  sourceGroup: string;
  target: string;
  targetGroup: string;
  count: number;
}

export interface OrganizationGraphViewData {
  graphData: GraphData;
  categoryDistribution: OrganizationGraphCategory[];
  connectedKeywords: ConnectedKeywordItem[];
}

function normalizeGroup(group: string): GraphGroupKey | string {
  return group.toLowerCase();
}

function getNodeId(label: string, group: string) {
  return `${group}:${label}`;
}

function buildNodeMap(nodes: OrganizationGraphNodeResponse[]) {
  return new Map(
    nodes.map((node) => [
      node.label,
      getNodeId(node.label, normalizeGroup(node.group)),
    ]),
  );
}

function buildNodeGroupMap(nodes: OrganizationGraphNodeResponse[]) {
  return new Map(
    nodes.map((node) => [node.label, normalizeGroup(node.group)]),
  );
}

function toGraphNodes(nodes: OrganizationGraphNodeResponse[]): GraphNode[] {
  return nodes.map((node) => {
    const normalizedGroup = normalizeGroup(node.group);

    return {
      id: getNodeId(node.label, normalizedGroup),
      name: node.label,
      group: normalizedGroup,
      weight: node.weight,
    };
  });
}

function toGraphLinks(
  links: OrganizationGraphLinkResponse[],
  nodeIdByLabel: Map<string, string>,
): GraphLink[] {
  const graphLinks: GraphLink[] = [];

  links.forEach((link) => {
    const source = nodeIdByLabel.get(link.source_label);
    const target = nodeIdByLabel.get(link.target_label);

    if (!source || !target) return;

    graphLinks.push({
      source,
      target,
      value: link.weight,
    });
  });

  return graphLinks;
}

function toCategoryDistribution(
  categoryDistribution: Record<string, number>,
): OrganizationGraphCategory[] {
  return Object.entries(categoryDistribution)
    .map(([group, count]) => {
      const normalizedGroup = normalizeGroup(group);
      const meta = GRAPH_GROUP_META[normalizedGroup as GraphGroupKey] ?? null;

      return {
        key: normalizedGroup,
        name: meta?.label ?? normalizedGroup,
        count,
        color: meta?.color ?? "#9ca3af",
      };
    })
    .sort((a, b) => b.count - a.count);
}

function toConnectedKeywords(
  links: OrganizationGraphLinkResponse[],
  nodeGroupByLabel: Map<string, string>,
): ConnectedKeywordItem[] {
  return [...links]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5)
    .map((link) => ({
      source: link.source_label,
      sourceGroup: nodeGroupByLabel.get(link.source_label) ?? "",
      target: link.target_label,
      targetGroup: nodeGroupByLabel.get(link.target_label) ?? "",
      count: link.weight,
    }));
}

function normalizeOrganizationGraphData(
  response: OrganizationGraphResponse,
): OrganizationGraphViewData {
  const nodeIdByLabel = buildNodeMap(response.nodes);
  const nodeGroupByLabel = buildNodeGroupMap(response.nodes);

  return {
    graphData: {
      nodes: toGraphNodes(response.nodes),
      links: toGraphLinks(response.links, nodeIdByLabel),
    },
    categoryDistribution: toCategoryDistribution(
      response.category_distribution,
    ),
    connectedKeywords: toConnectedKeywords(response.links, nodeGroupByLabel),
  };
}

export function useOrganizationGraphData() {
  return useQuery<OrganizationGraphViewData>({
    queryKey: ORGANIZATION_GRAPH_QUERY_KEY,
    queryFn: async () => {
      const response = await api.get<{
        code: string;
        message: string;
        data: OrganizationGraphResponse;
      }>("/api/v1/graph/organization/data");

      return normalizeOrganizationGraphData(
        unwrapData<OrganizationGraphResponse>(response),
      );
    },
  });
}
