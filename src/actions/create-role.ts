"use server";

import { prisma } from "@/utilities";

import type { Mission } from "@prisma";

export async function createRole({
  missionId,
  name,
}: {
  missionId: Mission["id"];
  name: string;
}) {
  const role = await prisma.role.create({
    data: { missionId, name },
  });
  return role;
}
