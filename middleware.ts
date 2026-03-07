import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Protect API routes: verify requests come from same origin
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    // Allow same-origin requests and requests with no origin (server-side)
    if (origin) {
      const originHost = new URL(origin).host;
      if (host && originHost !== host) {
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
