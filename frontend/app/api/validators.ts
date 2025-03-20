'use client';

/**
 * Types for validator node data
 */
export interface ValidatorNode {
  id: string;
  name: string;
  address: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: number; // percentage
  delegated: number;
  apy: string;
  lastSeen: string;
  version: string;
}

/**
 * Fetch validator nodes from the API
 * @returns Array of validator nodes
 */
export async function fetchValidatorNodes(): Promise<ValidatorNode[]> {
  try {
    // Get the API URL from environment variable or use default
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.pingnet.org';
    
    // Fetch nodes data from the API
    const response = await fetch(`${apiUrl}/nodes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Don't cache the response
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch validator nodes: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to match our ValidatorNode interface
    return data.map((node: any) => ({
      id: node.id || node.nodeId || `node-${Math.random().toString(36).substring(2, 9)}`,
      name: node.name || `Validator ${node.id?.substring(0, 6) || ''}`,
      address: node.address || node.walletAddress || '',
      status: node.status || 'online',
      uptime: typeof node.uptime === 'number' ? node.uptime : parseFloat(node.uptime || '0'),
      delegated: node.delegated || node.stakedAmount || 0,
      apy: node.apy || node.estimatedApy || '8.2%',
      lastSeen: node.lastSeen || new Date().toISOString(),
      version: node.version || '1.0.0',
    }));
  } catch (error) {
    console.error('Error fetching validator nodes:', error);
    
    // Return empty array in case of error
    return [];
  }
} 