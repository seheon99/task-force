"use server";

import { BadgeColor } from "@/components/base";
import { createProtection, prisma } from "@/utilities/server-only";

import type { Mission, User } from "@prisma";

const _createRole = createProtection(
  async (
    user: User,
    {
      missionId,
      name,
      color,
    }: {
      missionId: Mission["id"];
      name: string;
      color: BadgeColor;
    },
  ) => {
    const role = await prisma.role.create({
      data: { missionId, name, color },
    });
    return role;
  },
);

export async function createRole(...args: Parameters<typeof _createRole>) {
  return await _createRole(...args);
}
