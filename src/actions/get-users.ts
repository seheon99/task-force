"use server";

import { prisma } from "@/utilities";

export async function getUsers() {
  return await prisma.user.findMany({ where: { deletedAt: null } });
}
