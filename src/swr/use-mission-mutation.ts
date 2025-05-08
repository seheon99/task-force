import useSWRMutation from "swr/mutation";

import { updateMission } from "@/actions/database";

import type { Mission, User } from "@prisma";

import { SWR_KEY_MISSION } from "./use-mission";

async function fetcher(
  [, id]: ReturnType<typeof SWR_KEY_MISSION>,
  {
    arg: {
      title,
      description,
      readinessTime,
      operationTime,
      participantUserIds,
      roles,
    },
  }: {
    arg: {
      title?: Mission["title"];
      description?: Mission["description"];
      readinessTime?: string;
      operationTime?: string;
      participantUserIds?: User["id"][];
      roles?: Parameters<typeof updateMission>[0]["roles"];
    };
  },
) {
  return await updateMission({
    id,
    title,
    description,
    readinessTime,
    operationTime,
    participantUserIds,
    roles,
  });
}

export function useMissionMutation(id: Mission["id"]) {
  return useSWRMutation(SWR_KEY_MISSION(id), fetcher);
}
