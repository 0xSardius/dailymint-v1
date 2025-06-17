"use client";

import { useAuth } from "~/hooks/useAuth";

export function TestConnection() {
  const { makeAuthenticatedRequest, isLoading, error } = useAuth();

  const testConnections = async () => {
    try {
      const result = await makeAuthenticatedRequest("/api/test");
      console.log("Test result:", result);
      alert("Connection test successful! Check console for details.");
    } catch (err) {
      console.error("Test failed:", err);
      alert("Test failed! Check console for details.");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={testConnections}
        disabled={isLoading}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Testing..." : "Test Connections"}
      </button>
      {error && (
        <div className="mt-2 text-red-500">
          Error: {error.message}
        </div>
      )}
    </div>
  );
} 