"use client";

import { useEffect, useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import { useAccount } from "wagmi";

interface TokenBalanceProps {
  tokenAddress: string;
}

interface TokenBalanceResponse {
  balance: string;
}

export function TokenBalance({ tokenAddress }: TokenBalanceProps) {
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { address, isConnected } = useAccount();
  const { makeAuthenticatedRequest } = useAuth();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address) return;

      try {
        setIsLoading(true);
        setError(null);
        const result = await makeAuthenticatedRequest<TokenBalanceResponse>(
          `/api/tokens/${tokenAddress}/balance?address=${address}`
        );
        setBalance(result.balance);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch balance"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [tokenAddress, address, makeAuthenticatedRequest]);

  if (!isConnected) {
    return <div className="text-sm text-gray-500">Connect wallet to view balance</div>;
  }

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading balance...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">Error: {error.message}</div>;
  }

  if (!balance) {
    return <div className="text-sm text-gray-500">No balance found</div>;
  }

  return (
    <div className="text-sm">
      Balance: {balance}
    </div>
  );
} 