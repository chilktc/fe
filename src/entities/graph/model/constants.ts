export const GRAPH_GROUP_META = {
  work_structure: {
    label: "업무구조",
    color: "#3B82F6",
  },
  leadership: {
    label: "리더십",
    color: "#8B5CF6",
  },
  peer_relations: {
    label: "동료관계",
    color: "#F59E0B",
  },
  career_growth: {
    label: "커리어성장",
    color: "#10B981",
  },
  culture_system: {
    label: "조직문화제도",
    color: "#EC4899",
  },
  emotional_exhaustion: {
    label: "정서적소진",
    color: "#92400E",
  },
} as const;

export type GraphGroupKey = keyof typeof GRAPH_GROUP_META;
