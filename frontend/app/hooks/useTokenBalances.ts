"use client"

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PROGRAM_ADDRESSES, SOLANA_RPC } from '@/app/constants/programs';

// Use token addresses from constants
const PING_TOKEN_ADDRESS = PROGRAM_ADDRESSES.PING_TOKEN_ADDRESS;
const VRT_TOKEN_ADDRESS = PROGRAM_ADDRESSES.VRT_TOKEN_ADDRESS;

export function useTokenBalances() {
  const { publicKey, connected } = useWallet();
  const [pingBalance, setPingBalance] = useState<number | null>(null);
  const [vrtBalance, setVrtBalance] = useState<number | null>(null);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connected || !publicKey) {
      setPingBalance(null);
      setVrtBalance(null);
      setSolBalance(null);
      return;
    }

    const fetchBalances = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Connect to Solana using the endpoint from constants
        const connection = new Connection(SOLANA_RPC.ENDPOINT);
        
        // Fetch SOL balance
        const solanaBalance = await connection.getBalance(publicKey);
        setSolBalance(solanaBalance / LAMPORTS_PER_SOL);
        
        // Fetch PING token balance
        const pingTokenBalance = await getTokenBalance(connection, publicKey, new PublicKey(PING_TOKEN_ADDRESS));
        setPingBalance(pingTokenBalance);
        
        // Fetch VRT token balance
        const vrtTokenBalance = await getTokenBalance(connection, publicKey, new PublicKey(VRT_TOKEN_ADDRESS));
        setVrtBalance(vrtTokenBalance);
      } catch (err) {
        console.error('Error fetching token balances:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch token balances');
        
        // For development/testing, set mock values if real fetch fails
        if (process.env.NODE_ENV === 'development') {
          setPingBalance(1000);
          setVrtBalance(250);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
    
    // Set up an interval to refresh balances every 30 seconds
    const intervalId = setInterval(fetchBalances, 30000);
    
    return () => clearInterval(intervalId);
  }, [publicKey, connected]);

  // Helper function to get token balance
  async function getTokenBalance(connection: Connection, walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<number> {
    try {
      // Find all token accounts owned by the wallet
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        walletAddress,
        { programId: TOKEN_PROGRAM_ID }
      );
      
      // Find the specific token account for the requested mint
      const tokenAccount = tokenAccounts.value.find(
        account => account.account.data.parsed.info.mint === tokenMintAddress.toString()
      );
      
      if (!tokenAccount) {
        return 0; // No tokens of this type owned
      }
      
      // Get the balance and decimals
      const balance = tokenAccount.account.data.parsed.info.tokenAmount.uiAmount;
      return balance;
    } catch (error) {
      console.error(`Error fetching ${tokenMintAddress.toString()} balance:`, error);
      return 0;
    }
  }

  return {
    pingBalance,
    vrtBalance,
    solBalance,
    isLoading,
    error
  };
} 