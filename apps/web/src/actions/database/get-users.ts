"use server";

import { prisma } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";

const _getUsers = createProtection(async () => {
  return await prisma.user.findMany();
});

export async function getUsers(...args: Parameters<typeof _getUsers>) {
  return await _getUsers(...args);
}
