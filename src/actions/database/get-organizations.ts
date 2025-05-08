"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import { User } from "@prisma";

const _getOrganizations = createProtection(async (user: User) => {
  return await prisma.organization.findMany({
    include: {
      Member: true,
      _count: {
        select: {
          Member: true,
          Mission: true,
        },
      },
    },
    where: {
      Member: {
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
