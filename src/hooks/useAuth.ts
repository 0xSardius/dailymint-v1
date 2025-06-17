import { sdk } from "@farcaster/frame-sdk";
import { useState } from "react";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const makeAuthenticatedRequest = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    try {
      setIsLoading(true);
      setError(null);

      // This will automatically handle getting/refreshing the token
      const response = await sdk.quickAuth.fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    makeAuthenticatedRequest,
    isLoading,
    error,
  };
} 