"use server";

import type { Organization, User } from "@taskforce/database";
import { prisma } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";


const _getOrganization = createProtection(
  async (user: User, { id }: { id: Organization["id"] }) => {
    return await prisma.organization.findUnique({
      where: { id },
      include: {
        members: {
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
