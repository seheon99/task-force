"use server";

import { prisma } from "@/utilities";

import type { Mission, User } from "@prisma";

export async function createParticipant({
  userId,
  missionId,
}: {
  userId: User["id"];
  missionId: Mission["id"];
}) {
  const participant = await prisma.participant.create({
    data: { userId, missionId },
  });
  return participant;
}
