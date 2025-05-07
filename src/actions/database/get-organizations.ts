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
}
