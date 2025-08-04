"use server";

import type { Mission, User } from "@taskforce/database";
import { prisma } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";


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
