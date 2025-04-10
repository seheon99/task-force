"use client";

import useSWR from "swr";

import { getMission } from "@/actions";

import type { Mission } from "@prisma";

async function fetchMission([, id]: [string, Mission["id"]]) {
  const mission = await getMission({ id });
  return mission;
}

export function useMission({ id }: { id: Mission["id"] }) {
  return useSWR(["mission", id], fetchMission);
}
