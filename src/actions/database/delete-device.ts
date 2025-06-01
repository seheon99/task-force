"use server";

import { prisma } from "@/utilities/server-only";

export async function deleteDevice({ id }: { id: string }) {
  return await prisma.device.delete({ where: { id } });
}
