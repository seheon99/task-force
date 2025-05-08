"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import { User } from "@prisma";

export const getOrganizations = createProtection(async (user: User) => {
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
