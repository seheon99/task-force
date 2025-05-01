"use server";

import { prisma } from "@/utilities";

import type { Mission, User } from "@prisma";

export async function createRandomSeed({
  userId,
  missionId,
  number,
}: {
  userId: User["id"];
  missionId: Mission["id"];
  number: number;
}) {
  return await prisma.randomSeed.create({
    data: {
      userId,
      missionId,
      number,
    },
  });
}
