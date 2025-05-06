"use server";

import { unauthorized } from "next/navigation";
import { Temporal } from "temporal-polyfill";

import { convertToPlainObject } from "@/utilities";
import { prisma, verifySession } from "@/utilities/server-only";

export async function getMissions() {
  const user = await verifySession();
  if (!user) {
    unauthorized();
  }

  const today = Temporal.Now.plainDateISO();
  const yesterday = today.subtract({ days: 1 });
  return convertToPlainObject(
    await prisma.mission.findMany({
      include: {
        organization: true,
        roles: true,
        participants: {
          include: {
            user: {
              include: {
                randomSeeds: {
                  where: {
                    createdAt: {
                      gte: new Date(yesterday.toString()),
                    },
                  },
                },
                exempts: {
                  include: {
                    excuse: true,
                  },
                  where: {
                    startedAt: {
                      lte: new Date(today.toString()),
                    },
                    endedAt: {
                      gte: new Date(today.toString()),
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
            userId: user.id,
          },
        },
      },
    }),
  );
}
