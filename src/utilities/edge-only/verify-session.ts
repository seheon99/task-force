import { decodeProtectedHeader, jwtVerify } from "jose";
import { cookies } from "next/headers";

import { ACCESS_TOKEN } from "@/constants";
import { googlePublicKey } from "@/utilities/edge-only";

export async function verifySession() {
  try {
    const token = await getAccessToken();
    const cryptoKey = await getCryptoKeyFromToken(token);
    const { payload } = await jwtVerify(token, cryptoKey);
    const id = payload["user_id"] as string;
    return id;
  } catch {
    return null;
  }
}

async function getAccessToken(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN)?.value;
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
