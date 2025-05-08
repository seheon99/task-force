"use server";

import { createProtection, prisma } from "@/utilities/server-only";

export const getUsers = createProtection(async () => {
  return await prisma.user.findMany();
});
