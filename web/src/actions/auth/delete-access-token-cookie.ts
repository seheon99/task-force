"use server";

import { cookies } from "next/headers";

import { ACCESS_TOKEN } from "@/constants";

export async function deleteAccessTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN);
}
