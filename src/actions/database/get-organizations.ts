"use server";

import { unauthorized } from "next/navigation";

import { prisma, verifySession } from "@/utilities/server-only";

export async function getOrganizations() {
  const user = await verifySession();
  if (!user) {
    return unauthorized();
  }

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
          userId: user.id,
          deletedAt: null,
        },
      },
    },
  });
}
