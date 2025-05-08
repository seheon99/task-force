"use server";

import { unauthorized } from "next/navigation";
import { Temporal } from "temporal-polyfill";

import { convertToPlainObject } from "@/utilities";
import { createProtection, prisma } from "@/utilities/server-only";

import type { Mission, User } from "@prisma";

const _getMission = createProtection(
  async (user: User, { id }: { id: Mission["id"] }) => {
    const participants = await prisma.participant.findMany({
      where: { missionId: id },
    });
    if (!participants.some((p) => p.userId === user.id)) {
      unauthorized();
    }

    const today = Temporal.Now.plainDateISO();
    const yesterday = today.subtract({ days: 1 });
    return convertToPlainObject(
      await prisma.mission.findUnique({
        include: {
          organization: true,
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
          roles: true,
        },
        where: { id },
      }),
    );
  },
);

export async function getMission(...args: Parameters<typeof _getMission>) {
  return await _getMission(...args);
}
