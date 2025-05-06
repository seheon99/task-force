import useSWR from "swr";

import { getMission } from "@/actions/database";

import { Mission } from "@prisma";

async function fetcher([, id]: ReturnType<typeof SWR_KEY_MISSION>) {
  return await getMission({ id });
}

export const SWR_KEY_MISSION = (id: Mission["id"]) => ["SWR_MISSION", id];

export function useMission({ id }: { id: Mission["id"] }) {
  return useSWR(SWR_KEY_MISSION(id), fetcher);
}
