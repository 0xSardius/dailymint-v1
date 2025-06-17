import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    // Get FID from the header set by our middleware
    const fid = request.headers.get("x-farcaster-fid");
    if (!fid) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Test database connection by fetching user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select()
      .eq("fid", fid)
      .single();

    if (userError) {
      console.error("Database error:", userError);
      return NextResponse.json(
        { error: "Database error", details: userError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Connection test successful",
      auth: { fid },
      database: { user },
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 