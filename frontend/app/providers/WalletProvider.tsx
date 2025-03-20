"use client"

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from "react"
import type React from "react"

// Import the CSS for the wallet modal
import "@solana/wallet-adapter-react-ui/styles.css"

export function ClientWalletProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // You can also provide a custom RPC endpoint
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => 
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network), 
    [network]
  )

  // Initialize wallet adapters
  const wallets = useMemo(() => [
    new WalletConnectWalletAdapter({
      network,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'default-project-id',
        metadata: {
          name: 'Ping Dashboard',
          description: 'Ping Dashboard for staking and managing tokens',
          url: 'https://pingnet.org',
          icons: ['https://pingnet.org/favicon.ico']
        }
      }
    })
  ], [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

