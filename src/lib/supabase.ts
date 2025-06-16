import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Environment variable validation
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

// Validate environment variables
const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

// Create Supabase client
export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          fid: number;
          username: string | null;
          display_name: string | null;
          pfp_url: string | null;
          wallet_address: string | null;
          total_coins_earned: number;
          created_at: string;
          updated_at: string;
          last_login: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at' | 'last_login'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      daily_prompts: {
        Row: {
          id: string;
          date: string;
          prompt_text: string;
          prompt_type: 'text' | 'visual' | 'idea' | 'micro_fiction';
          created_by_user_id: string | null;
          is_community_generated: boolean;
          votes: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['daily_prompts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['daily_prompts']['Insert']>;
      };
      creations: {
        Row: {
          id: string;
          user_id: string;
          prompt_id: string;
          content: string;
          content_type: string;
          zora_token_id: number | null;
          zora_contract_address: string | null;
          mint_hash: string | null;
          is_minted: boolean;
          coins_earned: number;
          is_public: boolean;
          metadata: Record<string, any>;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['creations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['creations']['Insert']>;
      };
      user_streaks: {
        Row: {
          id: string;
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_creation_date: string | null;
          total_creations: number;
          streak_start_date: string | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_streaks']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['user_streaks']['Insert']>;
      };
      collections: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          zora_collection_address: string | null;
          is_public: boolean;
          creation_count: number;
          total_coins_value: number;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['collections']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['collections']['Insert']>;
      };
      collection_items: {
        Row: {
          id: string;
          collection_id: string;
          creation_id: string;
          added_at: string;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['collection_items']['Row'], 'id' | 'added_at'>;
        Update: Partial<Database['public']['Tables']['collection_items']['Insert']>;
      };
      user_tokens: {
        Row: {
          id: string;
          user_id: string;
          token_balance: number;
          total_earned: number;
          total_spent: number;
          last_updated: string;
        };
        Insert: Omit<Database['public']['Tables']['user_tokens']['Row'], 'id' | 'last_updated'>;
        Update: Partial<Database['public']['Tables']['user_tokens']['Insert']>;
      };
      token_transactions: {
        Row: {
          id: string;
          user_id: string;
          transaction_type: 'earned' | 'spent' | 'bonus';
          amount: number;
          description: string;
          creation_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['token_transactions']['Row'], 'id' | 'created_at'>;
        Update: never; // Transactions are immutable
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: 'streak' | 'reward' | 'social' | 'system';
          title: string;
          message: string;
          is_read: boolean;
          created_at: string;
          data: Record<string, any> | null;
        };
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };
    };
  };
};

// Helper function to get typed Supabase client
export const getTypedSupabaseClient = () => {
  return supabase as unknown as ReturnType<typeof createClient<Database>>;
}; 