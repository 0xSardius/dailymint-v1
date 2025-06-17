"use client";

import { TokenManager } from "~/components/tokens/TokenManager";
import { TokenList } from "~/components/tokens/TokenList";

export default function TokensPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Token Management</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <TokenManager />
        </div>
        <div>
          <TokenList />
        </div>
      </div>
    </div>
  );
} 