"use server";

import { cookies } from "next/headers";

import { ACCESS_TOKEN } from "@/constants";

export async function setAccessTokenCookie(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN, accessToken, { secure: true, httpOnly: true });
}
