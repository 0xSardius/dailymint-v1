"use client";

import { sdk } from "@farcaster/frame-sdk";
import { useState } from "react";

export function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      // This will automatically handle the auth flow and get a token
      const { token } = await sdk.quickAuth.getToken();
      
      // Store the token in localStorage for future use
      localStorage.setItem("farcaster_token", token);
      
      // Notify the app that we're ready
      sdk.actions.ready();
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleSignIn}
        disabled={isLoading}
        className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
      >
        {isLoading ? "Signing in..." : "Sign in with Farcaster"}
      </button>
    </div>
  );
} 