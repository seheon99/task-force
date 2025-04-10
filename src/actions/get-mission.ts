"use server";

import { prisma } from "@/utilities";

import type { Mission } from "@prisma";

export async function getMission({ id }: { id: Mission["id"] }) {
  const mission = await prisma.mission.findUnique({
    where: { id },
    include: {
      participants: {
        include: {
          user: {
            include: {
              randomSeeds: {
                where: {
                  missionId: id,
                },
              },
              exempts: {
                include: {
                  excuse: true,
                },
                where: {
                  startedAt: {
                    lte: new Date(),
                  },
                  endedAt: {
                    gte: new Date(),
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return mission;
}
