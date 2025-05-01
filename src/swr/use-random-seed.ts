import useSWRMutation from "swr/mutation";

import { createRandomSeed } from "@/actions/create-random-seed";

import type { Mission, RandomSeed, User } from "@prisma";

export const SWR_KEY_RANDOM_SEED = (
  userId: User["id"],
  missionId: Mission["id"],
) => ["SWR_RANDOM_SEED", userId, missionId];

async function createFetcher(
  [, userId, missionId]: ReturnType<typeof SWR_KEY_RANDOM_SEED>,
  { arg: { number } }: { arg: { number: RandomSeed["number"] } },
) {
  return await createRandomSeed({ userId, missionId, number });
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
