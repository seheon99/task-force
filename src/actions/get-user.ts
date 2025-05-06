"use server";

import { prisma } from "@/utilities/server-only";

export async function getUser({ id }: { id: string }) {
  return await prisma.user.findUnique({
    where: { id },
  });
}
