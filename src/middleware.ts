import { NextRequest, NextResponse } from "next/server";

import { verifySession } from "./utilities/edge-only";

const protectedRoutes = ["/dashboard", "/missions", "/settings"];

export default async function middleware(req: NextRequest) {
  if (!isProtectedRoute(req)) {
    return NextResponse.next();
  }

  if (await verifySession()) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
}

function isProtectedRoute(req: NextRequest) {
  return protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
