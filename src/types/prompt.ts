export interface DailyPrompt {
  id: string;
  title: string;
  description: string;
  date: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePromptInput {
  title: string;
  description: string;
  date: string;
  active?: boolean;
} 