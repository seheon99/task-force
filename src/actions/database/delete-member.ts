"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import type { Member, User } from "@prisma";

const _deleteMember = createProtection(
  async (user: User, { id }: { id: Member["id"] }) => {
    return await prisma.member.delete({
      where: { id },
    });
  },
);

export async function deleteMember(...args: Parameters<typeof _deleteMember>) {
  return await _deleteMember(...args);
}
