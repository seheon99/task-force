"use server";

import { prisma } from "@/utilities/server-only";
import { createProtection } from "@/utilities/server-only";

import type { Member, Organization, User } from "@prisma";

const _createMember = createProtection(
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

export async function createMember(...args: Parameters<typeof _createMember>) {
  return await _createMember(...args);
}
