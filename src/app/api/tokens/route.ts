import { NextResponse } from "next/server";
import { getSession } from "~/auth";
import { supabase } from "~/lib/supabase";
import { createToken } from "~/lib/services/tokenService";

// GET /api/tokens - Get all tokens
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all tokens for the user
    const { data: tokens, error } = await supabase
      .from("user_tokens")
      .select("*")
      .eq("user_id", session.user.fid);

    if (error) {
      console.error("Error fetching tokens:", error);
      return NextResponse.json({ error: "Failed to fetch tokens" }, { status: 500 });
    }

    return NextResponse.json({ tokens });
  } catch (error) {
    console.error("Error in GET /api/tokens:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/tokens - Create a new token
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, symbol, metadataUri } = await request.json();

    // Validate required fields
    if (!name || !symbol || !metadataUri) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create token on-chain
    const tokenAddress = await createToken({ name, symbol, metadataUri });

    // Store token in database
    const { data: token, error } = await supabase
      .from("user_tokens")
      .insert({
        user_id: session.user.fid,
        token_address: tokenAddress,
        name,
        symbol,
        metadata_uri: metadataUri,
      })
      .select()
      .single();

    if (error) {
      console.error("Error storing token:", error);
      return NextResponse.json({ error: "Failed to store token" }, { status: 500 });
    }

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error in POST /api/tokens:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 