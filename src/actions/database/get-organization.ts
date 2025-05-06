"use server";

import { prisma } from "@/utilities/server-only";

import type { Organization } from "@prisma";

export async function getOrganization({ id }: { id: Organization["id"] }) {
  return await prisma.organization.findUnique({
    where: { id },
    include: {
      Member: {
        include: { user: true },
      },
    },
  });
}
