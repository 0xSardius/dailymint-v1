import { createPublicClient, createWalletClient, http } from "viem";
import { base } from "wagmi/chains";
import { createCoin, setApiKey } from "@zoralabs/coins-sdk";

// Initialize the SDK with your API key
setApiKey(process.env.ZORA_API_KEY!);

// Initialize viem clients
const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
});

const walletClient = createWalletClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
});

interface CreateTokenParams {
  name: string;
  symbol: string;
  metadataUri: string;
}

export async function createToken({ name, symbol, metadataUri }: CreateTokenParams): Promise<string> {
  try {
    // Create token parameters
    const params = {
      name,
      symbol,
      uri: metadataUri,
      payoutRecipient: process.env.WALLET_ADDRESS as `0x${string}`,
      chainId: base.id,
    };

    // Create token using Zora SDK
    const result = await createCoin(params, walletClient, publicClient);

    if (!result.address) {
      throw new Error("Token creation failed - no address returned");
    }

    return result.address;
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Failed to create token");
  }
}

export async function getTokenBalance(tokenAddress: string, userAddress: string): Promise<string> {
  try {
    // Get token balance using viem
    const balance = await publicClient.readContract({
      address: tokenAddress as `0x${string}`,
      abi: [
        {
          inputs: [{ name: "account", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "balanceOf",
      args: [userAddress as `0x${string}`],
    });

    return balance.toString();
  } catch (error) {
    console.error("Error getting token balance:", error);
    throw new Error("Failed to get token balance");
  }
} 