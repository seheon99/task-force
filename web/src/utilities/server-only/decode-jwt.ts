import "server-only";

import { type JWTPayload, jwtVerify } from "jose";

import { environments } from "./environments";

const secret = new TextEncoder().encode(environments.JWT_SECRET);

export async function decodeJwt(token: string) {
  const { payload } = await jwtVerify<{
    iss: NonNullable<JWTPayload["iss"]>;
    sub: NonNullable<JWTPayload["sub"]>;
    iat: NonNullable<JWTPayload["iat"]>;
  }>(token, secret, {
    issuer: environments.JWT_ISSUER,
  });
  return payload;
}
