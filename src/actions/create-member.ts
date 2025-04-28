"use server";

import { prisma } from "@/utilities";
import { Organization, User } from "@prisma";

export async function createMember({
  userId,
  organizationId,
}: {
  userId: User["id"];
  organizationId: Organization["id"];
}) {
  return await prisma.member.create({
    data: {
      userId,
      organizationId,
    },
  });
}
