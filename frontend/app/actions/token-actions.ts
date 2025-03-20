'use server';

import { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { createMintToInstruction, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import bs58 from 'bs58';

// Define token address for PING token
import { PROGRAM_ADDRESSES } from '@/app/constants/programs';
const PING_TOKEN_ADDRESS = PROGRAM_ADDRESSES.PING_TOKEN_ADDRESS;

// Simple in-memory rate limiting
// In a production environment, this should be replaced with a Redis-based solution
type RateLimitEntry = {
  lastRequest: number;
  count: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_REQUESTS_PER_WINDOW = 3; // Maximum 3 airdrops per day

/**
 * Check if a wallet has exceeded the rate limit
 * @param walletAddress The wallet address to check
 * @returns Whether the wallet has exceeded the rate limit
 */
function isRateLimited(walletAddress: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(walletAddress);
  
  if (!entry) {
    // First request
    rateLimitMap.set(walletAddress, { lastRequest: now, count: 1 });
    return false;
  }
  
  // Check if the rate limit window has reset
  if (now - entry.lastRequest > RATE_LIMIT_WINDOW_MS) {
    // Reset the counter
    rateLimitMap.set(walletAddress, { lastRequest: now, count: 1 });
    return false;
  }
  
  // Check if the wallet has exceeded the maximum number of requests
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  // Increment the counter
  rateLimitMap.set(walletAddress, { lastRequest: entry.lastRequest, count: entry.count + 1 });
  return false;
}

/**
 * Get the remaining airdrop attempts for a wallet
 * @param walletAddress The wallet address to check
 * @returns The number of remaining airdrop attempts
 */
export async function getRemainingAirdropAttempts(walletAddress: string): Promise<{ remaining: number; resetTime: number | null }> {
  if (!walletAddress) {
    return { remaining: MAX_REQUESTS_PER_WINDOW, resetTime: null };
  }
  
  const now = Date.now();
  const entry = rateLimitMap.get(walletAddress);
  
  if (!entry) {
    // No previous requests
    return { remaining: MAX_REQUESTS_PER_WINDOW, resetTime: null };
  }
  
  // Check if the rate limit window has reset
  if (now - entry.lastRequest > RATE_LIMIT_WINDOW_MS) {
    return { remaining: MAX_REQUESTS_PER_WINDOW, resetTime: null };
  }
  
  // Calculate remaining attempts and reset time
  const remaining = Math.max(0, MAX_REQUESTS_PER_WINDOW - entry.count);
  const resetTime = entry.lastRequest + RATE_LIMIT_WINDOW_MS;
  
  return { remaining, resetTime };
}

/**
 * Mint PING tokens to a user's wallet
 * @param walletAddress The public key of the wallet to mint tokens to
 * @param amount The amount of tokens to mint
 * @returns Object containing success status and transaction signature or error message
 */
export async function mintPingTokens(walletAddress: string, amount: number = 100): Promise<{ success: boolean; message: string; txSignature?: string }> {
  try {
    // Validate inputs
    if (!walletAddress) {
      return { success: false, message: 'Wallet address is required' };
    }
    
    if (amount <= 0) {
      return { success: false, message: 'Amount must be greater than 0' };
    }
    
    // Check rate limiting
    if (isRateLimited(walletAddress)) {
      return { 
        success: false, 
        message: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_WINDOW} airdrops per ${RATE_LIMIT_WINDOW_MS / (60 * 60 * 1000)} hours.` 
      };
    }
    
    // Connect to Solana
    const connection = new Connection(
      process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
      'confirmed'
    );
    
    // Get the mint authority private key from environment variable
    const mintAuthorityPrivateKey = process.env.MINT_AUTHORITY_PRIVATE_KEY;
    if (!mintAuthorityPrivateKey) {
      return { success: false, message: 'Mint authority private key not configured' };
    }
    
    // Create a keypair from the private key
    const mintAuthority = Keypair.fromSecretKey(
      bs58.decode(mintAuthorityPrivateKey)
    );
    
    // Convert wallet address string to PublicKey
    const recipientPublicKey = new PublicKey(walletAddress);
    
    // Get the token mint
    const tokenMint = new PublicKey(PING_TOKEN_ADDRESS);
    
    // Get the associated token account for the recipient
    const recipientTokenAccount = await getAssociatedTokenAddress(
      tokenMint,
      recipientPublicKey
    );
    
    // Check if the token account exists
    const tokenAccountInfo = await connection.getAccountInfo(recipientTokenAccount);
    
    // Create a new transaction
    const transaction = new Transaction();
    
    // If the token account doesn't exist, create it
    if (!tokenAccountInfo) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          mintAuthority.publicKey,  // payer
          recipientTokenAccount,    // associated token account
          recipientPublicKey,       // owner
          tokenMint                 // mint
        )
      );
    }
    
    // Add the mint instruction to the transaction
    transaction.add(
      createMintToInstruction(
        tokenMint,              // mint
        recipientTokenAccount,  // destination
        mintAuthority.publicKey, // authority
        amount * 10**9          // amount (with 9 decimals)
      )
    );
    
    // Send and confirm the transaction
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [mintAuthority]
    );
    
    console.log(`Minted ${amount} PING tokens to ${walletAddress}. Signature: ${signature}`);
    
    return { 
      success: true, 
      message: `Successfully minted ${amount} PING tokens`, 
      txSignature: signature 
    };
    
  } catch (error) {
    console.error('Error minting tokens:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to mint tokens' 
    };
  }
} 