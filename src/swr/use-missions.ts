"use client";

import useSWR from "swr";

import { getMissions } from "@/actions/database";

async function fetcher() {
  return await getMissions();
}

export const SWR_KEY_MISSIONS = "SWR_MISSIONS";

export function useMissions() {
  return useSWR(SWR_KEY_MISSIONS, fetcher);
}
