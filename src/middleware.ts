import { decodeProtectedHeader, jwtVerify } from "jose";
import { cookies as getCookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { googlePublicKey } from "@/utilities/edge-only";

import { ACCESS_TOKEN } from "./constants";

const protectedRoutes = ["/dashboard", "/missions", "/settings"];

export default async function middleware(req: NextRequest) {
  if (!isProtectedRoute(req)) {
    return NextResponse.next();
  }

  try {
    const token = await getAccessToken();
    const cryptoKey = await getCryptoKeyFromToken(token);
    const { payload } = await jwtVerify(token, cryptoKey);
    const userId = payload["user_id"];
    console.log("Authenticated user:", userId);
    return NextResponse.next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return redirectToSignIn(req);
  }
}

function isProtectedRoute(req: NextRequest) {
  return protectedRoutes.includes(req.nextUrl.pathname);
}

async function getAccessToken(): Promise<string> {
  const cookies = await getCookies();
  const token = cookies.get(ACCESS_TOKEN)?.value;
  if (!token) throw new Error("Missing access token");
  return token;
}

async function getCryptoKeyFromToken(token: string): Promise<CryptoKey> {
  const { kid } = decodeProtectedHeader(token);
  if (!kid) throw new Error("Missing KID in token");
  const cryptoKey = await googlePublicKey(kid);
  if (!cryptoKey) throw new Error("Invalid KID or missing key");
  return cryptoKey;
}

function redirectToSignIn(req: NextRequest) {
  return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
