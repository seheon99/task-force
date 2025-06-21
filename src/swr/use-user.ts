"use client";

import useSWR from "swr";

import { getUser } from "@/actions/database";
import { verifySession } from "@/utilities/client-only";

async function fetchUser() {
  const id = verifySession();
  if (!id) {
    return null;
  }

  const user = await getUser({ id });
  return user;
}

export const SWR_KEY_ME = "SWR_ME";

export function useUser() {
  return useSWR(SWR_KEY_ME, fetchUser);
}
