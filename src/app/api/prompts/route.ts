import { NextResponse } from "next/server";
import { promptService } from "~/lib/services/promptService";

export async function GET() {
  try {
    const prompt = await promptService.getActivePrompt();
    if (!prompt) {
      return NextResponse.json(
        { error: "No active prompt found" },
        { status: 404 }
      );
    }
    return NextResponse.json(prompt);
  } catch (error) {
    console.error("Error in GET /api/prompts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = await promptService.createPrompt(body);
    
    if (!prompt) {
      return NextResponse.json(
        { error: "Failed to create prompt" },
        { status: 500 }
      );
    }

    return NextResponse.json(prompt);
  } catch (error) {
    console.error("Error in POST /api/prompts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 