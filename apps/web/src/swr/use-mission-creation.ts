import useSWRMutation from "swr/mutation";
import { Temporal } from "temporal-polyfill";

import { createMission, createParticipant } from "@/actions/database";
import { UnauthorizedError } from "@/errors";
import { verifySession } from "@/utilities/client-only";

import { Mission, Organization } from "@prisma";

import { SWR_KEY_MISSIONS } from "./use-missions";

async function fetcher(
  _: unknown,
  {
    arg: { organizationId, title, description, readinessTime, operationTime },
  }: {
    arg: {
      organizationId: Organization["id"];
      title: Mission["title"];
      description: Mission["description"];
      readinessTime: Temporal.PlainTime;
      operationTime: Temporal.PlainTime;
    };
  },
) {
  const mission = await createMission({
    organizationId,
    title,
    description,
    readinessTime,
    operationTime,
  });
  const userId = verifySession();
  if (!userId) {
    throw new UnauthorizedError();
  }
  await createParticipant({ userId, missionId: mission.id });
  return mission;
}

export function useMissionCreation() {
  return useSWRMutation(SWR_KEY_MISSIONS, fetcher);
}
