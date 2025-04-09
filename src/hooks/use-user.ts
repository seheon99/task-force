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

export function useUser() {
  return useSWR("/user/me", fetchUser);
}
