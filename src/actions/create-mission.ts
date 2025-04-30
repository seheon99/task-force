"use server";

import { Temporal } from "temporal-polyfill";

import { prisma } from "@/utilities";

import type { Organization } from "@prisma";

export async function createMission({
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
}) {
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
}
