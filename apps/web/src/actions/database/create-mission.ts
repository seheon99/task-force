"use server";

import { Temporal } from "temporal-polyfill";

import type { Organization, User } from "@taskforce/database";
import { prisma } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";


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
