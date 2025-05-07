"use server";

import { prisma } from "@/utilities/server-only";

import type { Mission, Role, User } from "@prisma";

export async function updateMission({
  id,
  title,
  description,
  readinessTime,
  operationTime,
  participantUserIds,
  roles,
}: {
  id: Mission["id"];
  title?: Mission["title"];
  description?: Mission["description"];
  readinessTime?: string;
  operationTime?: string;
  participantUserIds?: User["id"][];
  roles?: Pick<Role, "id" | "name" | "color">[];
}) {
  const promises = [];

  if (participantUserIds?.length) {
    promises.push(setParticipants({ participantUserIds, missionId: id }));
  }
  if (roles?.length) {
    promises.push(setRoles({ missionId: id, roles }));
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

async function setParticipants({
  participantUserIds,
  missionId,
}: {
  participantUserIds: User["id"][];
  missionId: Mission["id"];
}) {
  const currentParticipants = await prisma.participant.findMany({
    select: { userId: true },
    where: { missionId },
  });
  const currentParticipantUserIds = currentParticipants.map(
    (participant) => participant.userId,
  );

  return await Promise.all([
    deleteNotRequiredParticipants({
      requiredParticipantUserIds: participantUserIds,
      currentParticipantUserIds,
    }),
    createRequiredParticipants({
      requiredParticipantUserIds: participantUserIds,
      currentParticipantUserIds,
      missionId,
    }),
  ]);
}

async function deleteNotRequiredParticipants({
  requiredParticipantUserIds,
  currentParticipantUserIds,
}: {
  requiredParticipantUserIds: User["id"][];
  currentParticipantUserIds: User["id"][];
}) {
  const pidsToDelete = currentParticipantUserIds.filter(
    (participantUserId) =>
      !requiredParticipantUserIds.find(
        (userId) => userId === participantUserId,
      ),
  );
  if (pidsToDelete.length) {
    return await prisma.participant.deleteMany({
      where: {
        id: {
          in: pidsToDelete,
        },
      },
    });
  }
}

async function createRequiredParticipants({
  requiredParticipantUserIds,
  currentParticipantUserIds,
  missionId,
}: {
  requiredParticipantUserIds: User["id"][];
  currentParticipantUserIds: User["id"][];
  missionId: Mission["id"];
}) {
  const uidsToCreate = requiredParticipantUserIds.filter(
    (userId) => !currentParticipantUserIds.find((uid) => uid === userId),
  );
  if (uidsToCreate.length) {
    return prisma.participant.createMany({
      data: uidsToCreate.map((userId) => ({
        userId,
        missionId,
      })),
    });
  }
}

async function setRoles({
  missionId,
  roles,
}: {
  missionId: Mission["id"];
  roles: NonNullable<Parameters<typeof updateMission>[0]["roles"]>;
}) {
  const currentRoles = await prisma.role.findMany({
    select: { id: true },
    where: { missionId },
  });
  const currentRoleIds = currentRoles.map((role) => role.id);
  return await Promise.all([
    deleteNotRequiredRoles({
      currentRoleIds,
      requiredRoleIds: roles.map((role) => role.id),
    }),
    createRequiredRoles({
      missionId,
      currentRoleIds,
      requiredRoles: roles,
    }),
  ]);
}

async function deleteNotRequiredRoles({
  currentRoleIds,
  requiredRoleIds,
}: {
  currentRoleIds: Role["id"][];
  requiredRoleIds: Role["id"][];
}) {
  const ridsToDelete = currentRoleIds.filter(
    (rid) => !requiredRoleIds.find((roleId) => roleId === rid),
  );
  if (ridsToDelete.length) {
    return await prisma.role.deleteMany({
      where: {
        id: {
          in: ridsToDelete,
        },
      },
    });
  }
}

async function createRequiredRoles({
  missionId,
  currentRoleIds,
  requiredRoles,
}: {
  missionId: Mission["id"];
  currentRoleIds: Role["id"][];
  requiredRoles: Pick<Role, "id" | "name" | "color">[];
}) {
  const rolesToCreate = requiredRoles.filter(
    ({ id }) => !currentRoleIds.find((rid) => rid === id),
  );
  return await prisma.role.createMany({
    data: rolesToCreate.map(({ name, color }) => ({
      name,
      color,
      missionId,
    })),
  });
}
