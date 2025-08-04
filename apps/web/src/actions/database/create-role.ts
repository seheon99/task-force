"use server";

import type { Mission, User } from "@taskforce/database";
import { prisma } from "@taskforce/database";

import { BadgeColor } from "@/components/base";
import { createProtection } from "@/utilities/server-only";


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
