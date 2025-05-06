"use client";

import useSWR from "swr";

import { getOrganizations } from "@/actions/database";
import { useUser } from "@/swr";

import { User } from "@prisma";

async function fetchOrganizations([, userId]: ReturnType<
  typeof SWR_KEY_ORGANIZATIONS
>) {
  if (!userId) {
    return [];
  }
  return await getOrganizations({ userId });
}

export const SWR_KEY_ORGANIZATIONS = (userId?: User["id"]) => [
  "SWR_ORGANIZATIONS",
  userId,
];

export function useOrganizations() {
  const { data: user } = useUser();
  return useSWR(SWR_KEY_ORGANIZATIONS(user?.id), fetchOrganizations);
}
