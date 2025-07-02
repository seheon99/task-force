"use client";

import useSWR from "swr";

import { getUsers } from "@/actions/database";

async function fetchUsers() {
  const users = await getUsers();
  return users;
}

export const SWR_KEY_USERS = "SWR_USERS";

export function useUsers() {
  return useSWR(SWR_KEY_USERS, fetchUsers);
}
