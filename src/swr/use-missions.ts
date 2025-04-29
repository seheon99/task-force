"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  createMission,
  createParticipant,
  createRole,
  getMissions,
} from "@/actions";
import { useUser } from "@/swr";

import type { Mission, Role, User } from "@prisma";

async function fetcher([, uid]: ReturnType<typeof SWR_KEY_MISSIONS>) {
  if (!uid) {
    return [];
  }

  const missions = await getMissions({ uid });
  return missions;
}

async function createFetcher(
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

export const SWR_KEY_MISSIONS = (uid?: User["id"]) => ["SWR_MISSIONS", uid];

export function useMissions() {
  const { data: user } = useUser();
  return useSWR(SWR_KEY_MISSIONS(user?.id), fetcher);
}

export function useMission({ id }: { id: Mission["id"] }) {
  const swr = useMissions();
  return { ...swr, data: swr.data?.find((m) => m.id === id) };
}

export function useMissionCreation() {
  const { data: user } = useUser();
  return useSWRMutation(SWR_KEY_MISSIONS(user?.id), createFetcher);
}
