"use server";

import { prisma } from "@/utilities/server-only";

export async function getUsers() {
  return await prisma.user.findMany();
}
