"use server";

import { unauthorized } from "next/navigation";

import { prisma, verifySession } from "@/utilities/server-only";

import type { Mission } from "@prisma";

export async function createRandomSeed({
  missionId,
  number,
}: {
  missionId: Mission["id"];
  number: number;
}) {
  const user = await verifySession();
  if (!user) {
    unauthorized();
  }
  return await prisma.randomSeed.create({
    data: {
      userId: user.id,
      missionId,
      number,
    },
  });
}
