import { isNotNil } from "es-toolkit";
import { errors as joseErrors, jwtVerify } from "jose";
import { cookies as getCookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { JWKS } from "@/utilities/edge-only";

import { ACCESS_TOKEN } from "./constants";

const protectedRoutes = ["/dashboard", "/missions", "/settings"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const cookies = await getCookies();
  const accessToken = cookies.get(ACCESS_TOKEN)?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  const options = {
    issuer: "https://securetoken.google.com/green-signal-troop",
    audience: "green-signal-troop",
  };
  const { payload } = await jwtVerify(accessToken, JWKS, options).catch(
    async (error) => {
      if (error?.code === "ERR_JWKS_MULTIPLE_MATCHING_KEYS") {
        for await (const publicKey of error) {
          try {
            return await jwtVerify(accessToken, publicKey, options);
          } catch (innerError) {
            if (
              typeof innerError === "object" &&
              isNotNil(innerError) &&
              "code" in innerError &&
              innerError.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED"
            ) {
              continue;
            }
            throw innerError;
          }
        }
        throw joseErrors.JWSSignatureVerificationFailed;
      }
      throw error;
    },
  );
  const userId = payload["user_id"];
  console.log(userId);
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
