'use client';

import { useState, useEffect } from 'react';
import { fetchValidatorNodes, ValidatorNode } from '../api/validators';

export function useValidatorNodes() {
  const [validators, setValidators] = useState<ValidatorNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNodes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const nodes = await fetchValidatorNodes();
      setValidators(nodes);
    } catch (err) {
      console.error('Error in useValidatorNodes:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch validator nodes');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch nodes on component mount
  useEffect(() => {
    fetchNodes();
    
    // Set up polling every 60 seconds to keep data fresh
    const intervalId = setInterval(fetchNodes, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return {
    validators,
    isLoading,
    error,
    refetch: fetchNodes
  };
} 