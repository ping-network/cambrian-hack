// Program addresses from deployment logs
export const PROGRAM_ADDRESSES = {
  // Governance and Registry
  POA_PROGRAM_ADDRESS: 'DJpuZdKukTdRp4m8C7AGg6oDLGNRdxyJ7FgUvbmGmzGs',
  NCN_PROGRAM_ADDRESS: '2pS3w59nrwCj71wArhjsGP5rUff61rUbeGQiimNJfQGP',
  ADMIN_ACCOUNT: '36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y',
  
  // Vault and Tickets
  VAULT_PROGRAM_ADDRESS: '5RZqs2PJRqdyqFc6vpykNCJP3M1yJYtHnmFChRpdM2iN',
  NCN_VAULT_TICKET: '7eudbK6TdsY9PrQMC8RvuXaKfMutXHioJwuKwxXLuanD',
  VAULT_NCN_TICKET: 'Di8dhyp7mTTh6JyHUidJeYaX6GT5QFVcXhyDJaXCFRgk',
  VAULT_OPERATOR_DELEGATION: '5avZvL4tjTJVjz4KcHLJayVEBKJ2TEjEMzyqvteFRxkz',
  OPERATOR_VAULT_TICKET: 'C7Gm8vETLnD3EUmop24sLariNsxAdFXCLMhpMuUT79RH',
  
  // NCN Operator
  OPERATOR_ADDRESS: 'DFTHqW9Mf2ATCbSVKNtFdr1QhZRX4KmEPHfZgzsDdPkm',
  NCN_OPERATOR_STATE: 'FEkkXoPLWWjH6qhYw8kWKWBCLbFggMXD8sr2RHioHvQm',
  
  // Tokens
  PING_TOKEN_ADDRESS: '7bTipDbEzURXndddwbYZA2ETwKvuGeWELKVLBQUoABKd',
  VRT_TOKEN_ADDRESS: 'Exrq7RYHr3sH7EWXmuuqtriZZ32X8RDeSskanb9i6dda',
};

// Program metadata for UI display
export const PROGRAM_METADATA = [
  {
    id: "ping.poa.v2",
    name: "Ping PoA Governance",
    address: PROGRAM_ADDRESSES.POA_PROGRAM_ADDRESS,
    description: "Proof of Authority governance program for the Ping Network",
    cluster: "devnet" as const,
    version: "1.0.0",
    deployedAt: "2025-02-05",
    status: "testing" as const
  },
  {
    id: "ping.ncn.v1",
    name: "Ping Node Registry (NCN)",
    address: PROGRAM_ADDRESSES.NCN_PROGRAM_ADDRESS,
    description: "Node registry and management program for the Ping Network",
    cluster: "devnet" as const,
    version: "1.0.0",
    deployedAt: "2025-02-05",
    status: "testing" as const
  },
  {
    id: "ping.vault.v1",
    name: "Ping Vault",
    address: PROGRAM_ADDRESSES.VAULT_PROGRAM_ADDRESS,
    description: "Vault program for the Jito Restaking protocol",
    cluster: "devnet" as const,
    version: "1.0.0",
    deployedAt: "2025-02-05",
    status: "testing" as const
  },
  {
    id: "ping.token.v1",
    name: "Ping Token",
    address: PROGRAM_ADDRESSES.PING_TOKEN_ADDRESS,
    description: "PING token for the Ping Network",
    cluster: "devnet" as const,
    version: "1.0.0",
    deployedAt: "2025-02-05",
    status: "testing" as const
  },
  {
    id: "ping.vrt.v1",
    name: "Vault Receipt Token (VRT)",
    address: PROGRAM_ADDRESSES.VRT_TOKEN_ADDRESS,
    description: "Vault Receipt Tokens for the Jito Restaking protocol",
    cluster: "devnet" as const,
    version: "1.0.0",
    deployedAt: "2025-02-05",
    status: "testing" as const
  },
  {
    id: "ping.ncn.vault.ticket",
    name: "NCN Vault Ticket",
    address: PROGRAM_ADDRESSES.NCN_VAULT_TICKET,
    description: "NCN Vault Ticket for the Jito Restaking protocol",
    cluster: "devnet" as const,
    version: "1.0.0",
    deployedAt: "2025-02-05",
    status: "testing" as const
  },
  {
    id: "ping.vault.ncn.ticket",
    name: "Vault NCN Ticket",
    address: PROGRAM_ADDRESSES.VAULT_NCN_TICKET,
    description: "Vault NCN Ticket for the Jito Restaking protocol",
    cluster: "devnet" as const,
    version: "1.0.0",
    deployedAt: "2025-02-05",
    status: "testing" as const
  },
  {
    id: "ping.operator",
    name: "Operator Account",
    address: PROGRAM_ADDRESSES.OPERATOR_ADDRESS,
    description: "Ping Validator Operator Account",
    cluster: "devnet" as const,
    version: "1.0.0",
    deployedAt: "2025-02-05",
    status: "testing" as const
  }
];

// RPC endpoints
export const SOLANA_RPC = {
  ENDPOINT: 'https://api.devnet.solana.com',
  WS_ENDPOINT: 'wss://api.devnet.solana.com',
}; 