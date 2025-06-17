import { NextResponse } from "next/server";
import { getSession } from "~/auth";
import { getTokenBalance } from "~/lib/services/tokenService";

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userAddress = searchParams.get("address");

    if (!userAddress) {
      return NextResponse.json(
        { error: "Missing user address" },
        { status: 400 }
      );
    }

    const balance = await getTokenBalance(params.address, userAddress);

    return NextResponse.json({ balance });
  } catch (error) {
    console.error("Error in GET /api/tokens/[address]/balance:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 