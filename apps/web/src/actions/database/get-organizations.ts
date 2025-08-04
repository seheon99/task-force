"use server";

import { prisma } from "@taskforce/database";
import { User } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";

const _getOrganizations = createProtection(async (user: User) => {
  return await prisma.organization.findMany({
    include: {
      members: true,
      _count: {
        select: {
          members: true,
          missions: true,
        },
      },
    },
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });
});

export async function getOrganizations(
  ...args: Parameters<typeof _getOrganizations>
) {
  return await _getOrganizations(...args);
}
