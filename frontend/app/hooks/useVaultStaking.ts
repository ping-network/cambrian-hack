"use client"

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { toast } from 'sonner';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import { PROGRAM_ADDRESSES, SOLANA_RPC } from '@/app/constants/programs';

// Helper function to create the stake instruction
function createStakeInstruction(
  programId: PublicKey,
  userAuthority: PublicKey,
  userPingTokenAccount: PublicKey,
  userVrtTokenAccount: PublicKey,
  vaultPingTokenAccount: PublicKey,
  vrtTokenMint: PublicKey,
  amount: number
): TransactionInstruction {
  const data = Buffer.alloc(9);
  // Instruction code for stake (0)
  data.writeUInt8(0, 0);
  // Amount to stake (8 bytes for a u64)
  data.writeBigUInt64LE(BigInt(amount), 1);

  return new TransactionInstruction({
    keys: [
      { pubkey: userAuthority, isSigner: true, isWritable: false },
      { pubkey: userPingTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userVrtTokenAccount, isSigner: false, isWritable: true },
      { pubkey: vaultPingTokenAccount, isSigner: false, isWritable: true },
      { pubkey: vrtTokenMint, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ],
    programId,
    data,
  });
}

export function useVaultStaking() {
  const { publicKey, signTransaction, connected } = useWallet();
  const [isStaking, setIsStaking] = useState(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stakeToVault = async (amount: number): Promise<boolean> => {
    if (!connected || !publicKey || !signTransaction) {
      toast.error("Wallet not connected");
      return false;
    }

    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      return false;
    }

    setIsStaking(true);
    setError(null);
    setTxSignature(null);

    try {
      // Connect to the Solana network using the endpoint from constants
      const connection = new Connection(SOLANA_RPC.ENDPOINT);
      
      // Convert amount to lamports (using 0 decimals as shown in logs: "Mint token to vault... amount 1000n")
      const amountInLamports = amount * Math.pow(10, 0);
      
      // Create a new transaction
      const transaction = new Transaction();
      
      // Get the vault program ID
      const vaultProgramId = new PublicKey(PROGRAM_ADDRESSES.VAULT_PROGRAM_ADDRESS);
      
      // Get the VRT token mint address
      const vrtTokenMint = new PublicKey(PROGRAM_ADDRESSES.VRT_TOKEN_ADDRESS);
      
      // Find the associated token accounts for the user's PING and VRT tokens
      const userPingTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(PROGRAM_ADDRESSES.PING_TOKEN_ADDRESS),
        publicKey
      );
      
      const userVrtTokenAccount = await getAssociatedTokenAddress(
        vrtTokenMint,
        publicKey
      );
      
      // Find the vault's PING token account (PDA derived from the vault program)
      const [vaultPingTokenAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("vault_ping_token"), vaultProgramId.toBuffer()],
        vaultProgramId
      );
      
      // Create the stake instruction
      const stakeInstruction = createStakeInstruction(
        vaultProgramId,
        publicKey,
        userPingTokenAccount,
        userVrtTokenAccount,
        vaultPingTokenAccount,
        vrtTokenMint,
        amountInLamports
      );
      
      // Add the instruction to the transaction
      transaction.add(stakeInstruction);
      
      // Set recent blockhash
      const { blockhash } = await connection.getLatestBlockhash('finalized');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      
      // Sign the transaction
      const signedTransaction = await signTransaction(transaction);
      
      // Send the signed transaction
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      
      // Confirm transaction
      await connection.confirmTransaction(signature, 'confirmed');
      
      // Set the transaction signature
      setTxSignature(signature);
      
      // Return success
      return true;
    } catch (err) {
      console.error('Error staking to vault:', err);
      setError(err instanceof Error ? err.message : 'Failed to stake tokens');
      return false;
    } finally {
      setIsStaking(false);
    }
  };

  return {
    stakeToVault,
    isStaking,
    txSignature,
    error
  };
} 