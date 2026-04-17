export interface GraphNode {
  id: string;
  name: string;
  group?: string;
  val?: number; // Size
  weight?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value?: number; // Thickness or strength
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
