"use server";

import { prisma } from "@/utilities/server-only";

export async function getDevices({ userId }: { userId: string }) {
  return await prisma.device.findMany({ where: { userId } });
}
