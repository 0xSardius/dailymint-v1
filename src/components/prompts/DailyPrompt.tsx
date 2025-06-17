"use client";

import { useEffect, useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import type { DailyPrompt } from "~/types/prompt";

export function DailyPrompt() {
  const [prompt, setPrompt] = useState<DailyPrompt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { makeAuthenticatedRequest, isLoading } = useAuth();

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const data = await makeAuthenticatedRequest<DailyPrompt>("/api/prompts");
        setPrompt(data);
        setError(null);
      } catch (err) {
        setError("Failed to load daily prompt");
        console.error("Error fetching prompt:", err);
      }
    };

    fetchPrompt();
  }, [makeAuthenticatedRequest]);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
        <div className="mt-4 h-20 w-full animate-pulse rounded bg-gray-200"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-gray-600">
        No prompt available for today
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">{prompt.title}</h2>
      <p className="mt-2 text-gray-600">{prompt.description}</p>
      <div className="mt-4 text-sm text-gray-500">
        {new Date(prompt.date).toLocaleDateString()}
      </div>
    </div>
  );
} 