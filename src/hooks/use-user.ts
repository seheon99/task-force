"use client";

import useSWR from "swr";

import { getUser } from "@/actions/get-user";
import { firebaseAuth } from "@/utilities";

async function fetchUser() {
  const firebaseUser = firebaseAuth.currentUser;
  if (!firebaseUser) {
    return null;
  }

  const user = await getUser({ id: firebaseUser.uid });
  return user;
}

export const SWR_KEY_ME = "SWR_ME";

export function useUser() {
  return useSWR(SWR_KEY_ME, fetchUser);
}
