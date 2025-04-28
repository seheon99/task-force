"use server";

import { prisma } from "@/utilities";

import type { Member, Organization, User } from "@prisma";

type Props =
  | {
      userId: User["id"];
      organizationId: Organization["id"];
      memberId?: never;
    }
  | {
      userId?: never;
      organizationId?: never;
      memberId: Member["id"];
    };

export async function getMember({ userId, organizationId, memberId }: Props) {
  if (memberId) {
    return await prisma.member.findUnique({ where: { id: memberId } });
  } else if (userId && organizationId) {
    return await prisma.member.findFirst({ where: { userId, organizationId } });
  } else {
    return null;
  }
}
