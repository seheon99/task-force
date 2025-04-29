"use server";

import { prisma } from "@/utilities";

import type { Organization } from "@prisma";

export async function updateOrganization({
  id,
  name,
  description,
}: {
  id: Organization["id"];
  name?: Organization["name"];
  description?: Organization["description"];
}) {
  return prisma.organization.update({
    where: { id },
    data: {
      name,
      description,
    },
  });
}
