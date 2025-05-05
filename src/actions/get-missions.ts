"use server";

import { Temporal } from "temporal-polyfill";

import { convertToPlainObject } from "@/utilities";
import { prisma } from "@/utilities/server-only";

import { User } from "@prisma";

export async function getMissions({ uid }: { uid: User["id"] }) {
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
            userId: uid,
          },
        },
      },
    }),
  );
}
