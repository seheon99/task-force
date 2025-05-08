"use server";

import { Temporal } from "temporal-polyfill";

import { convertToPlainObject } from "@/utilities";
import { createProtection, prisma } from "@/utilities/server-only";

import { User } from "@prisma";

export const getMissions = createProtection(async (user: User) => {
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
});
