"use client";

import useSWR from "swr";

import { getMissions } from "@/actions";
import { useUser } from "@/swr";

import type { User } from "@prisma";

async function fetchMissions([, uid]: ReturnType<typeof SWR_KEY_MISSIONS>) {
  if (!uid) {
    return [];
  }

  const missions = await getMissions({ uid });
  return missions;
}

export const SWR_KEY_MISSIONS = (uid?: User["id"]) => ["SWR_MISSIONS", uid];

export function useMissions() {
  const { data: user } = useUser();
  return useSWR(SWR_KEY_MISSIONS(user?.id), fetchMissions);
}
