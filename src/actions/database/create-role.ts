"use server";

import { BadgeColor } from "@/components/base";
import { prisma } from "@/utilities/server-only";

import type { Mission } from "@prisma";

export async function createRole({
  missionId,
  name,
  color,
}: {
  missionId: Mission["id"];
  name: string;
  color: BadgeColor;
}) {
  const role = await prisma.role.create({
    data: { missionId, name, color },
  });
  return role;
}
