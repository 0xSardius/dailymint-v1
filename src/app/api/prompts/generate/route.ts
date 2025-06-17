import { NextResponse } from "next/server";
import { generateDailyPrompt } from "~/lib/ai/promptGenerator";
import { promptService } from "~/lib/services/promptService";

export async function POST() {
  try {
    // Generate a new prompt using Claude
    const generatedPrompt = await generateDailyPrompt();
    
    // Save the prompt to the database
    const savedPrompt = await promptService.createPrompt(generatedPrompt);
    
    if (!savedPrompt) {
      return NextResponse.json(
        { error: "Failed to save generated prompt" },
        { status: 500 }
      );
    }

    return NextResponse.json(savedPrompt);
  } catch (error) {
    console.error("Error generating prompt:", error);
    return NextResponse.json(
      { error: "Failed to generate prompt" },
      { status: 500 }
    );
  }
} 