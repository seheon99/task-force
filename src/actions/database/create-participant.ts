"use server";

import { prisma } from "@/utilities/server-only";
import { createProtection } from "@/utilities/server-only";

import type { Mission, User } from "@prisma";

export const createParticipant = createProtection(
  async (
    user: User,
    {
      userId,
      missionId,
    }: {
      userId: User["id"];
      missionId: Mission["id"];
    },
  ) => {
    const participant = await prisma.participant.create({
      data: { userId, missionId },
    });
    return participant;
  },
);
