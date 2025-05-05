"use server";

import { prisma } from "@/utilities/server-only";

import type { Mission } from "@prisma";

export async function updateMission({
  id,
  title,
  description,
  readinessTime,
  operationTime,
}: {
  id: Mission["id"];
  title?: Mission["title"];
  description?: Mission["description"];
  readinessTime?: string;
  operationTime?: string;
}) {
  return prisma.mission.update({
    where: { id },
    data: {
      title,
      description,
      readinessTime,
      operationTime,
    },
  });
}
