import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const PROMPT_TEMPLATE = `You are a creative writing prompt generator. Generate a daily writing prompt that is:
1. Engaging and thought-provoking
2. Open-ended enough for personal interpretation
3. Suitable for a 2-3 minute response
4. Focused on personal reflection or creative expression

Format your response as JSON with the following structure:
{
  "title": "A catchy, engaging title",
  "description": "The prompt itself, 1-2 sentences"
}

Keep the tone warm and encouraging.`;

export async function generateDailyPrompt() {
  try {
    const { text } = await generateText({
      model: anthropic("claude-3-sonnet-20240229"),
      prompt: PROMPT_TEMPLATE,
      temperature: 0.7,
      maxTokens: 500,
    });

    const prompt = JSON.parse(text);

    return {
      title: prompt.title,
      description: prompt.description,
      date: new Date().toISOString().split("T")[0],
      active: true,
    };
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
}

export async function generatePromptStream() {
  const { text } = await generateText({
    model: anthropic("claude-3-sonnet-20240229"),
    prompt: PROMPT_TEMPLATE,
    temperature: 0.7,
    maxTokens: 500,
  });

  return text;
} 