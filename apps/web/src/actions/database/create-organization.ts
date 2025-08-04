"use server";

import type { Organization, User } from "@taskforce/database";
import { prisma } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";


const _createOrganization = createProtection(
  (
    user: User,
    {
      name,
      description,
    }: {
      name: Organization["name"];
      description: Organization["description"];
    },
  ) => {
    return prisma.organization.create({
      data: {
        name,
        description,
      },
    });
  },
);

export async function createOrganization(
  ...args: Parameters<typeof _createOrganization>
) {
  return await _createOrganization(...args);
}
