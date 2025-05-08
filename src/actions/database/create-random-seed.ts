"use server";

import { prisma } from "@/utilities/server-only";
import { createProtection } from "@/utilities/server-only";

import type { Mission, User } from "@prisma";

const _createRandomSeed = createProtection(
  async (
    user: User,
    {
      missionId,
      number,
    }: {
      missionId: Mission["id"];
      number: number;
    },
  ) => {
    return await prisma.randomSeed.create({
      data: {
        userId: user.id,
        missionId,
        number,
      },
    });
  },
);

export async function createRandomSeed(
  ...args: Parameters<typeof _createRandomSeed>
) {
  return await _createRandomSeed(...args);
}
