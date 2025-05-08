"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import type { Organization, User } from "@prisma";

const _getOrganization = createProtection(
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

export async function getOrganization(
  ...args: Parameters<typeof _getOrganization>
) {
  return await _getOrganization(...args);
}
