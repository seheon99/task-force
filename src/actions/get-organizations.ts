"use server";

import { prisma } from "@/utilities";

import type { User } from "@prisma";

export async function getOrganizations({ userId }: { userId: User["id"] }) {
  return await prisma.organization.findMany({
    include: {
      _count: {
        select: { Member: true, Mission: true },
      },
    },
    where: {
      Member: {
        some: {
          userId,
        },
      },
    },
  });
}
