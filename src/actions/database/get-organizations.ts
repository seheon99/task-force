"use server";

import { prisma } from "@/utilities/server-only";

import type { User } from "@prisma";

export async function getOrganizations({ userId }: { userId: User["id"] }) {
  return await prisma.organization.findMany({
    include: {
      Member: true,
      _count: {
        select: {
          Member: {
            where: {
              deletedAt: null,
            },
          },
          Mission: { where: { deletedAt: null } },
        },
      },
    },
    where: {
      Member: {
        some: {
          userId,
          deletedAt: null,
        },
      },
    },
  });
}
