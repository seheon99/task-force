import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { ACCESS_TOKEN } from "@/constants";

import { environments } from "../server-only";

export async function verifySession() {
  try {
    const token = await getAccessToken();
    const secret = new TextEncoder().encode(environments.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload.sub;
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
