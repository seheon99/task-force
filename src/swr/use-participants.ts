import useSWRMutation from "swr/mutation";

import { updateParticipants } from "@/actions/database";

import type { Mission, User } from "@prisma";

import { SWR_KEY_MISSION } from "./use-missions";

async function updateFetcher(
  [, missionId]: ReturnType<typeof SWR_KEY_MISSION>,
  { arg: { userIds } }: { arg: { userIds: User["id"][] } },
) {
  return await updateParticipants({ missionId, userIds });
}

export function useParticipantsMutation({
  missionId,
}: {
  missionId: Mission["id"];
}) {
  return useSWRMutation(SWR_KEY_MISSION(missionId), updateFetcher);
}
