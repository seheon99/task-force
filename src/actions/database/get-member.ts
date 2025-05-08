"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import type { Member, User } from "@prisma";

export const getMember = createProtection(
  async (user: User, { id }: { id: Member["id"] }) => {
    return await prisma.member.findUnique({ where: { id } });
  },
);
