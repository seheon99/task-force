"use server";

import { Temporal } from "temporal-polyfill";

import { prisma } from "@/utilities/server-only";
import { createProtection } from "@/utilities/server-only";

import type { Organization, User } from "@prisma";

const _createMission = createProtection(
  async (
    user: User,
    {
      title,
      description,
      readinessTime,
      operationTime,
      organizationId,
    }: {
      title: string;
      description: string;
      readinessTime: Temporal.PlainTime;
      operationTime: Temporal.PlainTime;
      organizationId: Organization["id"];
    },
  ) => {
    const mission = await prisma.mission.create({
      data: {
        title,
        description,
        readinessTime: readinessTime.toString(),
        operationTime: operationTime.toString(),
        organizationId,
      },
    });
    return mission;
  },
);

export async function createMission(
  ...args: Parameters<typeof _createMission>
) {
  return await _createMission(...args);
}
