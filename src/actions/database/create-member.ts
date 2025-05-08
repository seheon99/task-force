"use server";

import { prisma } from "@/utilities/server-only";
import { createProtection } from "@/utilities/server-only/protected-action-generator";

import type { Member, Organization, User } from "@prisma";

export const createMember = createProtection(
  (
    user: User,
    {
      userId,
      organizationId,
      isLeader,
    }: {
      userId: User["id"];
      organizationId: Organization["id"];
      isLeader?: Member["isLeader"];
    },
  ) => {
    return prisma.member.create({
      data: {
        userId,
        organizationId,
        isLeader,
      },
    });
  },
);
