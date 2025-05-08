"use server";

import { prisma } from "@/utilities/server-only";
import { createProtection } from "@/utilities/server-only";

import type { Organization, User } from "@prisma";

export const createOrganization = createProtection(
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
