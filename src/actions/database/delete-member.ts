"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import type { Member, User } from "@prisma";

export const deleteMember = createProtection(
  async (user: User, { id }: { id: Member["id"] }) => {
    return await prisma.member.delete({
      where: { id },
    });
  },
);
