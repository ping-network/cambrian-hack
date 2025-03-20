export interface SolanaProgram {
  id: string;
  name: string;
  address: string;
  description: string;
  cluster: 'mainnet' | 'devnet' | 'testnet';
  version: string;
  deployedAt: string;
  status: 'active' | 'beta' | 'testing' | 'deprecated';
} 