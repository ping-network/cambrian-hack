import { useEffect, useState } from 'react';
import { Node } from '@/types/nodes';
import { fetchNodes } from '@/services/nodeService';

export default function NodeStatus() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNodes = async () => {
      try {
        const data = await fetchNodes();
        if (data.error) {
          setError(data.error);
        } else {
          setNodes(data.nodes);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch nodes');
      } finally {
        setLoading(false);
      }
    };

    loadNodes();
    // Refresh every minute
    const interval = setInterval(loadNodes, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`p-4 rounded-lg border ${
            node.status === 'active'
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <h3 className="font-medium text-gray-900">Node {node.id}</h3>
          <p className={`mt-1 text-sm ${
            node.status === 'active' ? 'text-green-600' : 'text-red-600'
          }`}>
            Status: {node.status}
          </p>
        </div>
      ))}
    </div>
  );
} 