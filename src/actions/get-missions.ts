"use server";

import { prisma } from "@/utilities";
import { User } from "@prisma";

export async function getMissions({ uid }: { uid: User["id"] }) {
  const yesterday = new Date(
    new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0)
  );
  return await prisma.mission.findMany({
    include: {
      team: true,
      participants: {
        include: {
          user: {
            include: {
              randomSeeds: {
                where: {
                  createdAt: {
                    gte: yesterday,
                  },
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
    where: {
      participants: {
        some: {
          userId: uid,
        },
      },
    },
  });
}
