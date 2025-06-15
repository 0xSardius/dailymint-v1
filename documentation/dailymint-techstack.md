## 🛠️ Complete Tech Stack

### Frontend & Miniapp Framework
- **Next.js 14** (App Router for optimal Frame SDK integration)
- **TypeScript** (Type safety for hackathon speed)
- **Farcaster Mini Apps SDK** (Official Frame SDK + core miniapp functionality)
- **Farcaster Auth Kit** (Quick Auth / Sign In With Farcaster)
- **Neynar SDK** (Farcaster data, authentication & social features)
- **OnchainKit** (Wallet connection & transaction components only)
- **Neobrutalism.dev Components** (shadcn/ui based neobrutalism styling)
- **Framer Motion** (Smooth animations for engagement)

### Blockchain & Minting
- **Zora Protocol** (Primary minting infrastructure)
- **Zora Create API** (Backend minting operations)
- **Base** (L2 for cost-effective minting)
- **Viem** (Ethereum interactions)
- **Wagmi** (React hooks for Web3)

### Backend & Data
- **Supabase** (Database, Auth, Real-time subscriptions)
- **Neynar API** (Farcaster authentication, data & social features)
- **Vercel** (Deployment & Edge Functions)
- **Upstash Redis** (Caching & rate limiting)

### Additional Tools
- **Claude API (Anthropic)** (Prompt generation & content assistance)
- **Pinata** (IPFS metadata storage)
- **Resend** (Email notifications for streak milestones)

## 📁 Project Structure
dailymint/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── prompts/
│   │   ├── mint/
│   │   └── webhooks/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── miniapp/         # Frame-specific components
│   │   ├── creation/        # Content creation UI
│   │   └── social/          # Farcaster integration
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── zora.ts
│   │   ├── neynar.ts
│   │   └── utils.ts
│   ├── types/
│   └── hooks/
├── .well-known/
│   └── farcaster.json      # Frame manifest
└── public/

## 🗄️ Database Schema (Supabase) - Production Ready

```sql
-- Users table (comprehensive user data)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fid BIGINT UNIQUE NOT NULL,
  username TEXT,
  display_name TEXT,
  pfp_url TEXT,
  wallet_address TEXT,
  total_coins_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily prompts table (AI generated and community prompts)
CREATE TABLE daily_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  prompt_text TEXT NOT NULL,
  prompt_type TEXT NOT NULL CHECK (prompt_type IN ('text', 'visual', 'idea', 'micro_fiction')),
  created_by_user_id UUID REFERENCES users(id),
  is_community_generated BOOLEAN DEFAULT FALSE,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User creations table (all user-generated content)
CREATE TABLE creations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  prompt_id UUID REFERENCES daily_prompts(id) NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  zora_token_id BIGINT,
  zora_contract_address TEXT,
  mint_hash TEXT,
  is_minted BOOLEAN DEFAULT FALSE,
  coins_earned INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one creation per user per day
  UNIQUE(user_id, prompt_id)
);

-- User streaks table (gamification and habit tracking)
CREATE TABLE user_streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_creation_date DATE,
  total_creations INTEGER DEFAULT 0,
  streak_start_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collections table (user-organized content)
CREATE TABLE collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  zora_collection_address TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  creation_count INTEGER DEFAULT 0,
  total_coins_value INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collection items junction table
CREATE TABLE collection_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  creation_id UUID REFERENCES creations(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sort_order INTEGER DEFAULT 0,
  
  UNIQUE(collection_id, creation_id)
);

-- User tokens table (Coins v4 integration)
CREATE TABLE user_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  token_balance INTEGER DEFAULT 0,
  total_earned INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Token transactions table (complete audit trail)
CREATE TABLE token_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earned', 'spent', 'bonus')),
  amount INTEGER NOT NULL,
  description TEXT NOT NULL,
  creation_id UUID REFERENCES creations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table (in-app and push notifications)
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('streak', 'reward', 'social', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data JSONB -- Additional notification data
);

-- Indexes for performance
CREATE INDEX idx_users_fid ON users(fid);
CREATE INDEX idx_creations_user_date ON creations(user_id, created_at);
CREATE INDEX idx_creations_public ON creations(is_public, created_at) WHERE is_public = true;
CREATE INDEX idx_daily_prompts_date ON daily_prompts(date);
CREATE INDEX idx_token_transactions_user ON token_transactions(user_id, created_at);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (users can read/write their own data)
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can view own creations" ON creations FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own creations" ON creations FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Anyone can view public creations" ON creations FOR SELECT USING (is_public = true);

-- Add similar policies for other tables...
⚡ Core Implementation
1. Frame SDK Integration
typescript// app/layout.tsx
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'wagmi/chains';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MiniKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY!}
          chain={base}
          config={{
            appearance: {
              mode: 'auto',
              theme: 'neobrutalism',
              name: 'DailyMint'
            }
          }}
        >
          {children}
        </MiniKitProvider>
      </body>
    </html>
  );
}

// hooks/useDailyMint.ts
import { useMiniKit, useNotification, useComposeCast } from '@coinbase/onchainkit/minikit';
import { useEffect, useState } from 'react';

export function useDailyMint() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const sendNotification = useNotification();
  const composeCast = useComposeCast();
  
  // Initialize frame
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);
  
  const shareCreation = async (creation: any) => {
    await composeCast({
      text: `Just completed day ${creation.streak} of my creative journey! 🎨✨`,
      embeds: [`${process.env.NEXT_PUBLIC_URL}/creation/${creation.id}`]
    });
  };
  
  const sendStreakNotification = async (streak: number) => {
    await sendNotification({
      title: `${streak} Day Streak! 🔥`,
      body: `You're on fire! Keep the creative momentum going.`,
      targetUrl: `${process.env.NEXT_PUBLIC_URL}/create`
    });
  };
  
  return {
    context,
    isFrameReady,
    shareCreation,
    sendStreakNotification
  };
}
2. Zora Integration
typescript// lib/zora.ts
import { createPublicClient, createWalletClient, http } from 'viem';
import { base } from 'viem/chains';
import { ZoraCreator1155Impl } from '@zoralabs/protocol-deployments';

export class ZoraMinter {
  private publicClient;
  private walletClient;
  
  constructor() {
    this.publicClient = createPublicClient({
      chain: base,
      transport: http(process.env.NEXT_PUBLIC_RPC_URL)
    });
  }
  
  async createDailyCollection(userAddress: string, month: string) {
    // Create a monthly collection for user's daily mints
    const metadata = {
      name: `${month} Daily Creations`,
      description: `A collection of daily creative works from ${month}`,
      image: `${process.env.NEXT_PUBLIC_URL}/api/og/collection/${month}`,
    };
    
    // Upload metadata to IPFS via Pinata
    const metadataURI = await this.uploadMetadata(metadata);
    
    // Create collection contract
    const { contractAddress } = await this.deployCollection({
      name: metadata.name,
      symbol: 'DAILY',
      contractURI: metadataURI,
      defaultAdmin: userAddress,
      setupActions: []
    });
    
    return contractAddress;
  }
  
  async mintDailyCreation(params: {
    content: string;
    prompt: string;
    userAddress: string;
    collectionAddress: string;
    day: number;
  }) {
    const { content, prompt, userAddress, collectionAddress, day } = params;
    
    // Create metadata
    const metadata = {
      name: `Day ${day} Creation`,
      description: `Prompt: ${prompt}\n\n${content}`,
      content: content,
      attributes: [
        { trait_type: "Day", value: day.toString() },
        { trait_type: "Prompt Type", value: this.getPromptType(prompt) },
        { trait_type: "Creation Date", value: new Date().toISOString().split('T')[0] }
      ],
      image: await this.generateCreationImage(content, prompt)
    };
    
    const tokenURI = await this.uploadMetadata(metadata);
    
    // Mint token
    const mintArgs = {
      to: userAddress,
      tokenId: day,
      quantity: 1,
      tokenURI,
      salesConfig: {
        publicSalePrice: BigInt(777000000000000), // 0.000777 ETH
        maxSalePurchasePerAddress: 10,
        publicSaleStart: Math.floor(Date.now() / 1000),
        publicSaleEnd: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year
      }
    };
    
    return await this.mint(collectionAddress, mintArgs);
  }
  
  private async uploadMetadata(metadata: any): Promise<string> {
    const response = await fetch(`${process.env.PINATA_GATEWAY_URL}/pinning/pinJSONToIPFS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      },
      body: JSON.stringify(metadata)
    });
    
    const result = await response.json();
    return `ipfs://${result.IpfsHash}`;
  }
  
  private async generateCreationImage(content: string, prompt: string): Promise<string> {
    // Generate OG image for the creation
    const imageUrl = `${process.env.NEXT_PUBLIC_URL}/api/og/creation?content=${encodeURIComponent(content)}&prompt=${encodeURIComponent(prompt)}`;
    return imageUrl;
  }
  
  private getPromptType(prompt: string): string {
    // Simple classification logic
    if (prompt.includes('photo') || prompt.includes('image')) return 'visual';
    if (prompt.includes('idea') || prompt.includes('solution')) return 'idea';
    if (prompt.includes('story') || prompt.includes('55 words')) return 'micro_fiction';
    return 'text';
  }
}
3. Neynar Integration
typescript// lib/neynar.ts
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

export class NeynarService {
  private client: NeynarAPIClient;
  
  constructor() {
    this.client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);
  }
  
  async getUserByFid(fid: number) {
    try {
      const user = await this.client.lookupUserByFid(fid);
      return {
        fid: user.fid,
        username: user.username,
        displayName: user.display_name,
        pfpUrl: user.pfp_url,
        bio: user.profile.bio.text
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
  
  async publishCast(text: string, embeds?: string[]) {
    try {
      const cast = await this.client.publishCast({
        text,
        embeds: embeds?.map(url => ({ url }))
      });
      return cast;
    } catch (error) {
      console.error('Error publishing cast:', error);
      throw error;
    }
  }
  
  async getFollowers(fid: number) {
    try {
      const followers = await this.client.fetchUserFollowers(fid, {
        limit: 100
      });
      return followers.users;
    } catch (error) {
      console.error('Error fetching followers:', error);
      return [];
    }
  }
}
4. Neobrutalism.dev Setup & Components
First, install the neobrutalism components correctly:
bash# Initialize shadcn/ui (if not already done)
npx shadcn-ui@latest init

# Install specific neobrutalism components via CLI
npx shadcn-ui@latest add https://neobrutalism.dev/registry/styles/neobrutalism/button.json
npx shadcn-ui@latest add https://neobrutalism.dev/registry/styles/neobrutalism/card.json
npx shadcn-ui@latest add https://neobrutalism.dev/registry/styles/neobrutalism/input.json
npx shadcn-ui@latest add https://neobrutalism.dev/registry/styles/neobrutalism/textarea.json
npx shadcn-ui@latest add https://neobrutalism.dev/registry/styles/neobrutalism/badge.json
Critical: Update globals.css with neobrutalism styling:
css/* app/globals.css - Replace existing content */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 6%;
    --input: 240 5.9% 6%;
    --ring: 240 5.9% 10%;
    --radius: 0px;
    
    /* Neobrutalism specific variables */
    --main: 47 100% 50%;
    --main-foreground: 240 5.9% 10%;
    --main-2: 280 100% 50%;
    --main-2-foreground: 0 0% 98%;
    --main-3: 0 100% 50%;
    --main-3-foreground: 0 0% 98%;
    --main-4: 120 100% 40%;
    --main-4-foreground: 0 0% 98%;
    --main-5: 200 100% 50%;
    --main-5-foreground: 0 0% 98%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Add neobrutalism-specific utility classes */
@layer utilities {
  .font-heading {
    font-family: "Space Grotesk", "Inter", sans-serif;
    font-weight: 700;
  }
  
  .rounded-base {
    border-radius: 0px;
  }
  
  .shadow-base {
    box-shadow: 4px 4px 0px 0px #000;
  }
  
  .shadow-base-hover {
    box-shadow: 2px 2px 0px 0px #000;
  }
}
Component Usage Examples:
typescript// Use the installed neobrutalism components directly
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Example usage with neobrutalism variants
<Button variant="default" size="lg" className="font-heading">
  Create & Mint
</Button>

<Button variant="neutral" className="w-full">
  Share Creation
</Button>

<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle className="font-heading">Today's Prompt</CardTitle>
    <CardDescription>
      Write about something that surprised you today
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Textarea 
      placeholder="Start writing your response..."
      className="min-h-[120px]"
    />
  </CardContent>
  <CardFooter>
    <Button className="w-full font-heading">Submit</Button>
  </CardFooter>
</Card>
6. Vercel AI SDK + Claude Integration
typescript// lib/claude.ts
import { generateText, streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export class ClaudeService {
  private model = anthropic('claude-3-haiku-20240307');
  
  async generateDailyPrompt(type: 'text' | 'visual' | 'idea' | 'micro_fiction'): Promise<string> {
    const prompts = {
      text: "Generate a thoughtful, engaging writing prompt that encourages personal reflection or storytelling in 100-300 words. Make it accessible to all skill levels.",
      visual: "Create a photography or visual art prompt that helps someone notice beauty or meaning in their everyday environment.",
      idea: "Design a creative thinking prompt that challenges someone to generate innovative solutions or fresh perspectives on common problems.",
      micro_fiction: "Craft a micro-fiction writing prompt that can be completed in exactly 55 words, focusing on a complete story with beginning, middle, and end."
    };
    
    try {
      const { text } = await generateText({
        model: this.model,
        system: "You are a creative writing coach who creates inspiring daily prompts. Generate only the prompt text, no explanations or extra formatting. Keep it encouraging and accessible.",
        prompt: prompts[type],
        maxTokens: 150,
      });
      
      return text;
    } catch (error) {
      console.error('Error generating prompt:', error);
      return this.getFallbackPrompt(type);
    }
  }
  
  async enhanceUserCreation(content: string): Promise<{
    suggestions: string[];
    sentiment: 'positive' | 'neutral' | 'thoughtful';
    wordCount: number;
  }> {
    try {
      const { text } = await generateText({
        model: this.model,
        system: "You are a supportive creative writing assistant. Analyze the user's writing and provide encouraging feedback in JSON format.",
        prompt: `Please analyze this creative writing and respond with JSON format:
        {
          "suggestions": ["2-3 brief, encouraging suggestions"],
          "sentiment": "positive/neutral/thoughtful",
          "wordCount": actual_word_count
        }
        
        Content: "${content}"`,
        maxTokens: 200,
      });
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Error enhancing creation:', error);
      return {
        suggestions: ["Great work on today's creation!", "Keep building that creative streak!"],
        sentiment: 'positive',
        wordCount: content.split(' ').length
      };
    }
  }
  
  async generateCollectionName(creations: string[]): Promise<string> {
    try {
      const sampleContent = creations.slice(0, 3).join('\n---\n');
      
      const { text } = await generateText({
        model: this.model,
        system: "Generate a creative, catchy name for a collection of creative writings. Respond with just the collection name, no quotes or explanations.",
        prompt: `Based on these sample writings, suggest a collection name:\n\n${sampleContent}`,
        maxTokens: 50,
      });
      
      return text.trim();
    } catch (error) {
      console.error('Error generating collection name:', error);
      return 'My Creative Journey';
    }
  }
  
  private getFallbackPrompt(type: string): string {
    const fallbacks = {
      text: "Write about a moment today when you noticed something you'd never seen before.",
      visual: "Capture a photo that shows contrast - light and shadow, old and new, or calm and chaos.",
      idea: "Think of three ways to improve something you used today.",
      micro_fiction: "Tell a complete story about someone finding an unexpected object in exactly 55 words."
    };
    return fallbacks[type as keyof typeof fallbacks] || fallbacks.text;
  }
}

// API route for generating prompts
// app/api/prompts/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ClaudeService } from '@/lib/claude';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { type, date } = await req.json();
    
    // Check if we already have a prompt for today
    const { data: existingPrompt } = await supabase
      .from('daily_prompts')
      .select('*')
      .eq('date', date)
      .single();
    
    if (existingPrompt) {
      return NextResponse.json(existingPrompt);
    }
    
    // Generate new prompt with Claude via Vercel AI SDK
    const claudeService = new ClaudeService();
    const promptText = await claudeService.generateDailyPrompt(type);
    
    // Save to database
    const { data, error } = await supabase
      .from('daily_prompts')
      .insert({
        date,
        prompt_text: promptText,
        prompt_type: type,
        is_community_generated: false
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    );
  }
}

// Real-time content enhancement API
// app/api/content/enhance/route.ts
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: Request) {
  const { content } = await req.json();

  const result = await streamText({
    model: anthropic('claude-3-haiku-20240307'),
    system: 'You are a supportive creative writing assistant. Provide encouraging, constructive feedback.',
    prompt: `Please provide brief, encouraging feedback on this creative writing: "${content}"`,
  });

  return result.toAIStreamResponse();
}
7. Enhanced Creation Flow with Claude
typescript// hooks/useCreateDaily.ts
import { useState } from 'react';
import { useUser } from './useUser';
import { ClaudeService } from '@/lib/claude';
import { ZoraMinter } from '@/lib/zora';
import { supabase } from '@/lib/supabase';

export function useCreateDaily() {
  const { dbUser } = useUser();
  const [isCreating, setIsCreating] = useState(false);
  
  const createAndMint = async (content: string, prompt: any) => {
    if (!dbUser) throw new Error('User not authenticated');
    
    setIsCreating(true);
    
    try {
      // 1. Enhance content with Claude
      const claudeService = new ClaudeService();
      const enhancement = await claudeService.enhanceUserCreation(content);
      
      // 2. Save creation to database
      const { data: creation, error } = await supabase
        .from('creations')
        .insert({
          user_id: dbUser.id,
          prompt_id: prompt.id,
          content: content,
          content_type: 'text',
          is_minted: false
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // 3. Mint on Zora
      const zoraMinter = new ZoraMinter();
      const mintResult = await zoraMinter.mintDailyCreation({
        content,
        prompt: prompt.prompt_text,
        userAddress: dbUser.wallet_address, // You'd need to add this field
        collectionAddress: dbUser.collection_address, // Monthly collection
        day: new Date().getDate()
      });
      
      // 4. Update creation with mint info
      await supabase
        .from('creations')
        .update({
          is_minted: true,
          zora_token_id: mintResult.tokenId,
          zora_contract_address: mintResult.contractAddress,
          mint_hash: mintResult.transactionHash
        })
        .eq('id', creation.id);
      
      // 5. Update user streak
      await updateUserStreak(dbUser.id);
      
      return {
        creation,
        mintResult,
        enhancement
      };
      
    } catch (error) {
      console.error('Error creating daily mint:', error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };
  
  return {
    createAndMint,
    isCreating
  };
}

async function updateUserStreak(userId: string) {
  // Update streak logic here
  const today = new Date().toISOString().split('T')[0];
  
  const { data: streak } = await supabase
    .from('user_streaks')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (streak) {
    const lastDate = new Date(streak.last_creation_date);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let newStreak = diffDays === 1 ? streak.current_streak + 1 : 1;
    
    await supabase
      .from('user_streaks')
      .update({
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, streak.longest_streak),
        last_creation_date: today,
        total_creations: streak.total_creations + 1
      })
      .eq('user_id', userId);
  } else {
    await supabase
      .from('user_streaks')
      .insert({
        user_id: userId,
        current_streak: 1,
        longest_streak: 1,
        last_creation_date: today,
        total_creations: 1
      });
  }
}
typescript// app/page.tsx - Main Miniapp Entry
'use client';

import { useDailyMint } from '@/hooks/useDailyMint';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreationForm } from '@/components/creation/CreationForm';
import { useUser } from '@/hooks/useUser';

export default function DailyMintApp() {
  const { context, isFrameReady } = useDailyMint();
  const { user, todaysCreation, streak } = useUser();
  
  if (!isFrameReady) {
    return (
      <div className="min-h-screen bg-main flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-heading mb-2">DAILYMINT</div>
              <div className="text-lg">Loading your creative space...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-main p-4">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-heading mb-2 text-black">DAILYMINT</h1>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="font-heading text-lg px-3 py-1">
            DAY {streak || 0}
          </Badge>
          {streak >= 7 && (
            <Badge variant="default" className="font-heading">
              🔥 ON FIRE
            </Badge>
          )}
        </div>
      </header>
      
      <div className="max-w-2xl mx-auto">
        {todaysCreation ? (
          <CompletedView creation={todaysCreation} />
        ) : (
          <CreationView />
        )}
      </div>
    </div>
  );
}

function CompletedView({ creation }: { creation: any }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-heading text-center text-2xl">
          ✅ TODAY'S CREATION COMPLETE!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-base">
          <p className="font-mono">{creation.content}</p>
        </div>
        
        <div className="flex gap-2 justify-center">
          <Button variant="outline" className="font-heading">
            VIEW NFT
          </Button>
          <Button variant="default" className="font-heading">
            SHARE
          </Button>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          Come back tomorrow for your next prompt!
        </div>
      </CardContent>
    </Card>
  );
}

function CreationView() {
  // This would fetch today's prompt
  const prompt = {
    text: "Write about something that surprised you today",
    type: "text"
  };
  
  return <CreationForm prompt={prompt} />;
}

// components/creation/CreationForm.tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useCreateDaily } from '@/hooks/useCreateDaily';

interface CreationFormProps {
  prompt: {
    text: string;
    type: string;
  };
}

export function CreationForm({ prompt }: CreationFormProps) {
  const [content, setContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { createAndMint } = useCreateDaily();
  
  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsCreating(true);
    try {
      await createAndMint(content, prompt);
    } catch (error) {
      console.error('Creation failed:', error);
    } finally {
      setIsCreating(false);
    }
  };
  
  const isValidLength = content.length >= 50 && content.length <= 500;
  
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-2xl">Today's Prompt</CardTitle>
          <Badge variant="outline" className="font-heading">
            {prompt.type.toUpperCase()}
          </Badge>
        </div>
        <CardDescription className="text-lg font-medium">
          {prompt.text}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your response..."
          className="min-h-[120px] font-mono"
        />
        
        <div className="flex justify-between items-center">
          <span className={`text-sm font-heading ${
            isValidLength ? 'text-green-600' : 'text-red-600'
          }`}>
            {content.length}/500 characters
          </span>
          
          {isValidLength && (
            <Badge variant="secondary" className="font-heading">
              READY TO MINT
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={!isValidLength || isCreating}
          className="w-full font-heading text-lg"
          size="lg"
        >
          {isCreating ? 'MINTING...' : 'CREATE & MINT'}
        </Button>
      </CardFooter>
    </Card>
  );
}
🚀 Deployment Checklist
Environment Variables
bash# .env.local
NEXT_PUBLIC_URL=https://dailymint.vercel.app
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_key
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org

# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Farcaster & Social
NEYNAR_API_KEY=your_neynar_key

# Blockchain & Minting
PINATA_JWT=your_pinata_jwt
PINATA_GATEWAY_URL=https://api.pinata.cloud

# AI & Content
ANTHROPIC_API_KEY=your_anthropic_key

# Notifications
RESEND_API_KEY=your_resend_key
Vercel Deployment

Connect GitHub repo to Vercel
Set environment variables
Deploy with Build Command: npm run build
Add domain to Farcaster manifest

Frame Manifest Setup
json{
  "accountAssociation": {
    "header": "generated_header",
    "payload": "generated_payload", 
    "signature": "generated_signature"
  },
  "frame": {
    "version": "next",
    "name": "DailyMint",
    "iconUrl": "https://dailymint.vercel.app/icon.png",
    "splashImageUrl": "https://dailymint.vercel.app/splash.png",
    "splashBackgroundColor": "#fde047",
    "homeUrl": "https://dailymint.vercel.app",
    "buttonTitle": "Start Creating",
    "webhookUrl": "https://dailymint.vercel.app/api/webhooks"
  }
}
This stack gives you everything needed for a hackathon-winning DailyMint app with real viral potential! 🚀