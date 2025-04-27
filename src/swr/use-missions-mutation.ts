"use client";

import useSWRMutation from "swr/mutation";

import { createMission, createParticipant, createRole } from "@/actions";

import type { Mission, Role, User } from "@prisma";

import { useUser } from ".";
import { SWR_KEY_MISSIONS } from "./use-missions";

async function create(
  _: unknown,
  {
    arg: { title, description, roles, members },
  }: {
    arg: {
      title: Mission["title"];
      description: Mission["description"];
      roles: Role["name"][];
      members: User[];
    };
  },
) {
  const { id: missionId } = await createMission({ title, description });
  await Promise.all([
    ...roles.map((name) => createRole({ missionId, name })),
    ...members.map(({ id: userId }) =>
      createParticipant({ userId, missionId }),
    ),
  ]);
}

export function useMissionsMutation() {
  const { data: user } = useUser();
  return useSWRMutation(SWR_KEY_MISSIONS(user?.id), create);
}
