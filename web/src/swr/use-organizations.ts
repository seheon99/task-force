"use client";

import useSWR from "swr";

import { getOrganizations } from "@/actions/database";

async function fetchOrganizations() {
  return await getOrganizations();
}

export const SWR_KEY_ORGANIZATIONS = "SWR_ORGANIZATIONS";

export function useOrganizations() {
  return useSWR(SWR_KEY_ORGANIZATIONS, fetchOrganizations);
}
