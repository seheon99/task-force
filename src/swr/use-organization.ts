"use client";

import useSWR from "swr";

import { getOrganization } from "@/actions/database";

import type { Organization } from "@prisma";

async function fetchOrganization([, id]: ReturnType<
  typeof SWR_KEY_ORGANIZATION
>) {
  return await getOrganization({ id });
}

export const SWR_KEY_ORGANIZATION = (id: Organization["id"]) => [
  "SWR_ORGANIZATION",
  id,
];

export function useOrganization({ id }: { id: Organization["id"] }) {
  return useSWR(SWR_KEY_ORGANIZATION(id), fetchOrganization);
}
