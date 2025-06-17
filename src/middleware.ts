import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@farcaster/quick-auth";

const client = createClient();

export async function middleware(request: NextRequest) {
  // Skip middleware for non-API routes
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const authorization = request.headers.get("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid authorization header" },
      { status: 401 }
    );
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = await client.verifyJwt({
      token,
      domain: request.headers.get("host") || "localhost:3000",
    });

    if (!payload.sub) {
      throw new Error("Invalid token payload: missing FID");
    }

    // Add the FID to the request headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-farcaster-fid", payload.sub);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: "/api/:path*",
}; 