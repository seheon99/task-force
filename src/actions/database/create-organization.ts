"use server";

import { prisma } from "@/utilities/server-only";

import type { Organization } from "@prisma";

export async function createOrganization({
  name,
  description,
}: {
  name: Organization["name"];
  description: Organization["description"];
}) {
  return prisma.organization.create({
    data: {
      name,
      description,
    },
  });
}
