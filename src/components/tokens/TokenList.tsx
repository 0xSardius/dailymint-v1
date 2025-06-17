"use client";

import { useEffect, useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import { TokenBalance } from "./TokenBalance";

interface Token {
  address: string;
  name: string;
  symbol: string;
  metadataUri: string;
}

interface TokenListResponse {
  tokens: Token[];
}

export function TokenList() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { makeAuthenticatedRequest } = useAuth();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await makeAuthenticatedRequest<TokenListResponse>("/api/tokens");
        setTokens(result.tokens);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch tokens"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [makeAuthenticatedRequest]);

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading tokens...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">Error: {error.message}</div>;
  }

  if (tokens.length === 0) {
    return <div className="text-sm text-gray-500">No tokens found</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your Tokens</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token) => (
          <div
            key={token.address}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-900">{token.name}</h3>
            <p className="mt-1 text-xs text-gray-500">{token.symbol}</p>
            <div className="mt-2">
              <TokenBalance tokenAddress={token.address} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 