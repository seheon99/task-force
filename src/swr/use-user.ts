"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import useSWR, { mutate } from "swr";

import { getUser } from "@/actions/database";
import { firebaseApp, firebaseAuth } from "@/utilities/client-only";

onAuthStateChanged(firebaseAuth, () => mutate(SWR_KEY_ME));

async function fetchUser() {
  const firebaseUser = getAuth(firebaseApp).currentUser;
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
