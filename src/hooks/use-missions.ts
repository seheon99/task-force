"use client";

import useSWR from "swr";

import { getMissions } from "@/actions";
import { useUser } from "@/hooks";

import type { User } from "@prisma";

async function fetchMissions([, uid]: [typeof SWR_KEY_MISSIONS, User["id"]]) {
  const missions = await getMissions({ uid });
  return missions;
}

export const SWR_KEY_MISSIONS = "SWR_MISSIONS";

export function useMissions() {
  const { data: user } = useUser();
  return useSWR([SWR_KEY_MISSIONS, user?.id], fetchMissions);
}
