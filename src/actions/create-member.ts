"use server";

import { prisma } from "@/utilities/server-only";

import type { Member, Organization, User } from "@prisma";

export async function createMember({
  userId,
  organizationId,
  isLeader,
}: {
  userId: User["id"];
  organizationId: Organization["id"];
  isLeader?: Member["isLeader"];
}) {
  return await prisma.member.create({
    data: {
      userId,
      organizationId,
      isLeader,
    },
  });
}
