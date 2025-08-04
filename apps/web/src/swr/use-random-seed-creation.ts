import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import type { Mission, RandomSeed } from "@taskforce/database";

import { createRandomSeed } from "@/actions/database";


import { SWR_KEY_MISSIONS } from "./use-missions";

async function createFetcher(
  [, missionId]: ReturnType<typeof SWR_KEY_RANDOM_SEED>,
  { arg: { seedNumber } }: { arg: { seedNumber: RandomSeed["number"] } },
) {
  const randomSeed = await createRandomSeed({
    missionId,
    number: seedNumber,
  });
  mutate(SWR_KEY_MISSIONS);
  return randomSeed;
}

export const SWR_KEY_RANDOM_SEED = (missionId: Mission["id"]) => [
  "SWR_RANDOM_SEED",
  missionId,
];

export function useRandomSeedCreation({
  missionId,
}: {
  missionId: Mission["id"];
}) {
  return useSWRMutation(SWR_KEY_RANDOM_SEED(missionId), createFetcher);
}
