"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import type { Organization, User } from "@prisma";

const _updateOrganization = createProtection(
  async (
    user: User,
    {
      id,
      name,
      description,
    }: {
      id: Organization["id"];
      name?: Organization["name"];
      description?: Organization["description"];
    },
  ) => {
    return await prisma.organization.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
  },
);

export async function updateOrganization(
  ...args: Parameters<typeof _updateOrganization>
) {
  return await _updateOrganization(...args);
}
