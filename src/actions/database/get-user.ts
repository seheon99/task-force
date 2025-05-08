"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import { User } from "@prisma";

export const getUser = createProtection(
  async (user: User, { id }: { id: string }) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },
);
