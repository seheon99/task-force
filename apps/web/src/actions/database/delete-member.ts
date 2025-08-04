"use server";

import type { Member, User } from "@taskforce/database";
import { prisma } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";


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
