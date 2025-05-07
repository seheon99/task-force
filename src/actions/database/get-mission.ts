"use server";

import { unauthorized } from "next/navigation";
import { Temporal } from "temporal-polyfill";

import { convertToPlainObject } from "@/utilities";
import { prisma, verifySession } from "@/utilities/server-only";

import { Mission } from "@prisma";

export async function getMission({ id }: { id: Mission["id"] }) {
  const user = await verifySession();
  if (!user) {
    unauthorized();
  }

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
        roles: {
          where: {
            deletedAt: null,
          },
        },
      },
      where: { id },
    }),
  );
}
