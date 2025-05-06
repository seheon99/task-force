import useSWRMutation from "swr/mutation";

import { updateRoles } from "@/actions/database";

import type { Mission, Role } from "@prisma";

import { SWR_KEY_MISSION } from "./use-missions";

async function updateFetcher(
  [, missionId]: ReturnType<typeof SWR_KEY_MISSION>,
  {
    arg: { roles },
  }: {
    arg: { roles: Pick<Role, "id" | "name" | "color">[] };
  },
) {
  return await updateRoles({ missionId, roles });
}

export function useRolesMutation({ missionId }: { missionId: Mission["id"] }) {
  return useSWRMutation(SWR_KEY_MISSION(missionId), updateFetcher);
}
