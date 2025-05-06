"use server";

import { flatten } from "es-toolkit";

import { convertToPlainObject } from "@/utilities";
import { prisma } from "@/utilities/server-only";

import { Mission, User } from "@prisma";

export async function updateParticipants({
  missionId,
  userIds,
}: {
  missionId: Mission["id"];
  userIds: User["id"][];
}) {
  const currentParticipants = await prisma.participant.findMany({
    where: {
      missionId,
    },
  });

  const deleteTargets = currentParticipants.filter(
    (participant) => !userIds.find((userId) => userId === participant.userId),
  );
  const createTargets = userIds.filter(
    (userId) =>
      !currentParticipants.find((participant) => participant.userId === userId),
  );

  return convertToPlainObject(
    flatten(
      await Promise.all([
        ...deleteTargets.map((target) =>
          prisma.participant.delete({
            where: { id: target.id },
          }),
        ),
        prisma.participant.createManyAndReturn({
          data: createTargets.map((userId) => ({
            userId,
            missionId,
          })),
        }),
      ]),
    ),
  );
}
