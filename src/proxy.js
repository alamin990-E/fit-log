import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const sessionCookie = getSessionCookie(request);

  // Redirect unauthenticated users to sign-in page
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/singin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/editProfile/:path*", "/myPlan/:path*"],
};