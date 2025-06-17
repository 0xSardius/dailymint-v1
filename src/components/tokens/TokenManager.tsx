"use client";

import { useState } from "react";
import { useAuth } from "~/hooks/useAuth";

interface Token {
  address: string;
  name: string;
  symbol: string;
  metadataUri: string;
}

interface TokenListResponse {
  tokens: Token[];
}

export function TokenManager() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [metadataUri, setMetadataUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { makeAuthenticatedRequest } = useAuth();

  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !symbol || !metadataUri) return;

    try {
      setIsLoading(true);
      setError(null);

      await makeAuthenticatedRequest("/api/tokens", {
        method: "POST",
        body: JSON.stringify({ name, symbol, metadataUri }),
      });

      // Reset form
      setName("");
      setSymbol("");
      setMetadataUri("");
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to create token"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Create New Token</h2>
        <form onSubmit={handleCreateToken} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
              Symbol
            </label>
            <input
              type="text"
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="metadataUri" className="block text-sm font-medium text-gray-700">
              Metadata URI
            </label>
            <input
              type="text"
              id="metadataUri"
              value={metadataUri}
              onChange={(e) => setMetadataUri(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Token"}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error.message}</div>
          </div>
        )}
      </div>
    </div>
  );
} 