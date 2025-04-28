"use server";

import { invariant } from "es-toolkit";

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

export async function deleteMember({
  userId,
  organizationId,
  memberId,
}: Props) {
  if (userId && organizationId) {
    const member = await prisma.member.findFirst({
      where: { userId, organizationId },
    });
    invariant(
      member !== null,
      `No member with {userId: ${userId}, organizationId: ${organizationId}}`,
    );
    return await prisma.member.delete({ where: { id: member.id } });
  } else if (memberId) {
    return await prisma.member.delete({ where: { id: memberId } });
  }
}
