"use server";

import { prisma } from "@taskforce/database";
import { User } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";

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
