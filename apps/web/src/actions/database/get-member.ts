"use server";

import type { Member, User } from "@taskforce/database";
import { prisma } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";


const _getMember = createProtection(
  async (user: User, { id }: { id: Member["id"] }) => {
    return await prisma.member.findUnique({ where: { id } });
  },
);

export async function getMember(...args: Parameters<typeof _getMember>) {
  return await _getMember(...args);
}
