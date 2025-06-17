import { createClient } from "@supabase/supabase-js";
import type { DailyPrompt, CreatePromptInput } from "~/types/prompt";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const promptService = {
  async getActivePrompt(): Promise<DailyPrompt | null> {
    const { data, error } = await supabase
      .from("daily_prompts")
      .select()
      .eq("active", true)
      .single();

    if (error) {
      console.error("Error fetching active prompt:", error);
      return null;
    }

    return data;
  },

  async createPrompt(input: CreatePromptInput): Promise<DailyPrompt | null> {
    const { data, error } = await supabase
      .from("daily_prompts")
      .insert({
        ...input,
        active: input.active ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating prompt:", error);
      return null;
    }

    return data;
  },

  async deactivatePrompt(id: string): Promise<boolean> {
    const { error } = await supabase
      .from("daily_prompts")
      .update({ active: false, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("Error deactivating prompt:", error);
      return false;
    }

    return true;
  },
}; 