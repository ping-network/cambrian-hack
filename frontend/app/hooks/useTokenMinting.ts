"use client"

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { mintPingTokens, getRemainingAirdropAttempts } from '../actions/token-actions';

// Define token address for PING token
const PING_TOKEN_ADDRESS = 'GNjzMWhjLn1gQrgg74MGNZ68iyghBtpeQHhG5GUu7G1N';

export function useTokenMinting() {
  const { publicKey, connected } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [resetTime, setResetTime] = useState<number | null>(null);

  // Fetch remaining attempts when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      fetchRemainingAttempts();
    } else {
      setRemainingAttempts(null);
      setResetTime(null);
    }
  }, [connected, publicKey]);

  const fetchRemainingAttempts = async () => {
    if (!connected || !publicKey) return;
    
    try {
      const walletAddress = publicKey.toString();
      const result = await getRemainingAirdropAttempts(walletAddress);
      setRemainingAttempts(result.remaining);
      setResetTime(result.resetTime);
    } catch (err) {
      console.error('Error fetching remaining attempts:', err);
    }
  };

  const mintTokens = async (amount: number = 100) => {
    if (!connected || !publicKey) {
      setError("Wallet not connected");
      return false;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setTxSignature(null);
    
    try {
      // Call the server action to mint tokens
      const walletAddress = publicKey.toString();
      const result = await mintPingTokens(walletAddress, amount);
      
      if (result.success) {
        console.log(`Minted ${amount} PING tokens to ${walletAddress}`);
        setSuccess(true);
        if (result.txSignature) {
          setTxSignature(result.txSignature);
        }
        
        // Update remaining attempts after successful mint
        await fetchRemainingAttempts();
        
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err) {
      console.error('Error minting tokens:', err);
      setError(err instanceof Error ? err.message : 'Failed to mint tokens');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mintPingTokens: mintTokens,
    fetchRemainingAttempts,
    isLoading,
    error,
    success,
    txSignature,
    remainingAttempts,
    resetTime
  };
} 