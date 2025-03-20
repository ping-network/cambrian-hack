export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: 'active' | 'completed';
  yesVotes: number;
  noVotes: number;
  startTime: number;
  endTime: number;
  programId: string;
  transactionHash?: string;
}

export interface ProposalResponse {
  proposals: Proposal[];
  error?: string;
} 