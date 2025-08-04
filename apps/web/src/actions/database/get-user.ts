"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import { User } from "@prisma";

const _getUser = createProtection(
  async (user: User, { id }: { id: string }) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },
);

export async function getUser(...args: Parameters<typeof _getUser>) {
  return await _getUser(...args);
}
