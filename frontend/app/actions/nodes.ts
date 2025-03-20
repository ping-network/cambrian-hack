'use server';

import { NodeResponse } from '@/types/nodes';

if (!process.env.PING_API_BASE_URL) {
  console.error('PING_API_BASE_URL environment variable is not set');  
}

export async function getNodes(): Promise<NodeResponse> {
  try {
    const response = await fetch(`${process.env.PING_API_BASE_URL}/nodes`, {
      next: {
        revalidate: 60, // Revalidate every minute
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return {
      nodes: data,
    }
  } catch (error) {
    console.error('Error fetching nodes:', error);
    return {
      nodes: [],
      error: error instanceof Error ? error.message : 'Failed to fetch nodes'
    };
  }
} 