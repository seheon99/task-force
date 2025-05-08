"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import type { Organization, User } from "@prisma";

export const getOrganization = createProtection(
  async (user: User, { id }: { id: Organization["id"] }) => {
    return await prisma.organization.findUnique({
      where: { id },
      include: {
        Member: {
          include: { user: true },
        },
      },
    });
  },
);
