"use server";

import { decodeJwt, encodeJwt } from "@/utilities/server-only";

export async function restoreToken(token: string) {
  const payload = await decodeJwt(token);
  const accessToken = await encodeJwt(payload.sub);
  return accessToken;
}
