"use server";

import { Temporal } from "temporal-polyfill";

import { prisma } from "@/utilities/server-only";

import type { Mission, User } from "@prisma";

export async function updateMission({
  id,
  title,
  description,
  readinessTime,
  operationTime,
  participantUserIds,
}: {
  id: Mission["id"];
  title?: Mission["title"];
  description?: Mission["description"];
  readinessTime?: string;
  operationTime?: string;
  participantUserIds?: User["id"][];
}) {
  const promises = [];

  if (participantUserIds?.length) {
    const currentParticipants = await prisma.participant.findMany({
      select: { userId: true },
      where: { missionId: id },
    });

    const pidsToDelete = currentParticipants
      .map((participant) => participant.userId)
      .filter(
        (participantUserId) =>
          !participantUserIds.find((userId) => userId === participantUserId),
      );
    if (pidsToDelete.length) {
      promises.push(
        prisma.participant.updateMany({
          data: { deletedAt: Temporal.Now.plainDateTimeISO().toString() },
          where: {
            id: {
              in: pidsToDelete,
            },
          },
        }),
      );
    }

    const uidsToCreate = participantUserIds.filter(
      (userId) =>
        !currentParticipants.find(
          (participant) => participant.userId === userId,
        ),
    );
    if (uidsToCreate.length) {
      promises.push(
        prisma.participant.createMany({
          data: uidsToCreate.map((uid) => ({
            userId: uid,
            missionId: id,
          })),
        }),
      );
    }
  }
  promises.push(
    prisma.mission.update({
      where: { id },
      data: {
        title,
        description,
        readinessTime,
        operationTime,
      },
    }),
  );
  return Promise.all(promises);
}
