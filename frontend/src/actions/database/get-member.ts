"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import type { Member, User } from "@prisma";

const _getMember = createProtection(
  async (user: User, { id }: { id: Member["id"] }) => {
    return await prisma.member.findUnique({ where: { id } });
  },
);

export async function getMember(...args: Parameters<typeof _getMember>) {
  return await _getMember(...args);
}
