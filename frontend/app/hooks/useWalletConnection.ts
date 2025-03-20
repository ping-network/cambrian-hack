"use client"

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export function useWalletConnection() {
  const { connected, disconnect: walletDisconnect } = useWallet();
  const { setVisible } = useWalletModal();
  
  const connect = async () => {
    try {
      // Open the wallet modal to allow the user to connect
      setVisible(true);
      return true;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return false;
    }
  };
  
  const disconnect = async () => {
    try {
      // Disconnect the wallet
      await walletDisconnect();
      return true;
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      return false;
    }
  };
  
  return {
    isConnected: connected,
    connect,
    disconnect
  };
}

