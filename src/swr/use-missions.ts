"use client";

import { invariant, isString } from "es-toolkit";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Temporal } from "temporal-polyfill";

import {
  createMission,
  createParticipant,
  getMissions,
  updateMission,
} from "@/actions";
import { useUser } from "@/swr";

import type { Mission, Organization, User } from "@prisma";

async function fetcher([, uid]: ReturnType<typeof SWR_KEY_MISSIONS>) {
  if (!uid) {
    return [];
  }

  const missions = await getMissions({ uid });
  return missions;
}

async function createFetcher(
  [, userId]: ReturnType<typeof SWR_KEY_MISSIONS>,
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
  invariant(
    isString(userId),
    `String is expected for 'userId' but ${typeof userId}`,
  );

  const mission = await createMission({
    organizationId,
    title,
    description,
    readinessTime,
    operationTime,
  });
  await createParticipant({ userId, missionId: mission.id });
  return mission;
}

async function updateFetcher(
  _: unknown,
  {
    arg: { missionId, title, description, readinessTime, operationTime },
  }: {
    arg: {
      missionId: Mission["id"];
      title: Mission["title"];
      description: Mission["description"];
      readinessTime: string;
      operationTime: string;
    };
  },
) {
  return await updateMission({
    id: missionId,
    title,
    description,
    readinessTime,
    operationTime,
  });
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

export function useMissionMutation() {
  const { data: user } = useUser();
  return useSWRMutation(SWR_KEY_MISSIONS(user?.id), updateFetcher);
}
