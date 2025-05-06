"use server";

import { prisma } from "@/utilities/server-only";

import { Mission } from "@prisma";

export async function getMission({ id }: { id: Mission["id"] }) {
  return await prisma.mission.findUnique({
    include: {
      participants: {
        include: {
          user: true,
        },
      },
    },
    where: { id },
  });
}
