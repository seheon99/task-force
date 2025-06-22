import "server-only";

import { SignJWT } from "jose";

import { environments } from "./environments";

const secret = new TextEncoder().encode(environments.JWT_SECRET);

export async function encodeJwt(uid: string) {
  const token = await new SignJWT({ iss: environments.JWT_ISSUER, sub: uid })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
  return token;
}
