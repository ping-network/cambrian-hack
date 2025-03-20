export interface Node {
  id: string;
  external_id: string;
  last_seen: string;
  status: 'active' | 'inactive';
}

export interface NodeResponse {
  nodes: Node[];
  error?: string;
}