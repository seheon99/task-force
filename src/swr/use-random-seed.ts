import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { createRandomSeed } from "@/actions/create-random-seed";

import type { Mission, RandomSeed, User } from "@prisma";

import { SWR_KEY_MISSIONS } from "./use-missions";

export const SWR_KEY_RANDOM_SEED = (
  userId: User["id"],
  missionId: Mission["id"],
) => ["SWR_RANDOM_SEED", userId, missionId];

async function createFetcher(
  [, userId, missionId]: ReturnType<typeof SWR_KEY_RANDOM_SEED>,
  { arg: { number } }: { arg: { number: RandomSeed["number"] } },
) {
  const randomSeed = await createRandomSeed({ userId, missionId, number });
  mutate(SWR_KEY_MISSIONS(userId));
  return randomSeed;
}

export function useRandomSeedCreation({
  userId,
  missionId,
}: {
  userId: User["id"];
  missionId: Mission["id"];
}) {
  return useSWRMutation(SWR_KEY_RANDOM_SEED(userId, missionId), createFetcher);
}
