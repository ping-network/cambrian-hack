'use server';

import { ProposalResponse, Proposal } from '@/types/proposals';
import { Connection, PublicKey } from '@solana/web3.js';

// Solana program ID for ping.poa.v0
const PROGRAM_ID = 'ping.poa.v0';

// Public indexer endpoint
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';

export async function getProposals(): Promise<ProposalResponse> {
  try {
    // Connect to Solana
    const connection = new Connection(SOLANA_RPC_URL);
    
    // In a real implementation, we would use the Solana indexer to fetch transactions
    // related to the ping.poa.v0 program. For now, we'll return mock data.
    
    // This is where you would implement the actual indexer query
    // Example pseudocode:
    // const transactions = await fetchTransactionsForProgram(connection, PROGRAM_ID);
    // const proposals = parseProposalsFromTransactions(transactions);
    
    // Mock data for demonstration
    const mockProposals: Proposal[] = [
      {
        id: '1',
        title: 'Increase Node Rewards by 10%',
        description: 'This proposal aims to increase the rewards for node operators by 10% to incentivize more participation in the network.',
        proposer: '8xDrJzFZR7KLCCgEPT5kX9qM9TZ5XVsJQX3LUKiVD9ww',
        status: 'active',
        yesVotes: 1250000,
        noVotes: 450000,
        startTime: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
        endTime: Date.now() + 4 * 24 * 60 * 60 * 1000, // 4 days from now
        programId: PROGRAM_ID,
        transactionHash: '4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM'
      },
      {
        id: '2',
        title: 'Add Support for New Region: Asia-Pacific',
        description: 'Expand our network to include nodes in the Asia-Pacific region to improve latency for users in that area.',
        proposer: '5xRrJzFZR7KLCCgEPT5kX9qM9TZ5XVsJQX3LUKiVD9xx',
        status: 'active',
        yesVotes: 1800000,
        noVotes: 200000,
        startTime: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
        endTime: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days from now
        programId: PROGRAM_ID,
        transactionHash: '5uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofN'
      },
      {
        id: '3',
        title: 'Implement Slashing for Offline Nodes',
        description: 'Introduce a slashing mechanism for nodes that go offline without proper notification to ensure network reliability.',
        proposer: '9xDrJzFZR7KLCCgEPT5kX9qM9TZ5XVsJQX3LUKiVD9yy',
        status: 'completed',
        yesVotes: 950000,
        noVotes: 1050000,
        startTime: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
        endTime: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
        programId: PROGRAM_ID,
        transactionHash: '6uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofO'
      },
      {
        id: '4',
        title: 'Reduce Minimum Stake Requirement',
        description: 'Lower the minimum stake requirement from 1000 to 500 tokens to allow more participants to run nodes.',
        proposer: '7xDrJzFZR7KLCCgEPT5kX9qM9TZ5XVsJQX3LUKiVD9zz',
        status: 'completed',
        yesVotes: 2100000,
        noVotes: 900000,
        startTime: Date.now() - 20 * 24 * 60 * 60 * 1000, // 20 days ago
        endTime: Date.now() - 6 * 24 * 60 * 60 * 1000, // 6 days ago
        programId: PROGRAM_ID,
        transactionHash: '7uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofP'
      }
    ];

    return {
      proposals: mockProposals
    };
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return {
      proposals: [],
      error: error instanceof Error ? error.message : 'Failed to fetch proposals'
    };
  }
} 