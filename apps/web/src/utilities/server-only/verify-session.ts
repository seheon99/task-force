import "server-only";

import { prisma } from "@taskforce/database";

import { verifySession as verifySessionAndReturnUserId } from "@/utilities/edge-only";

export async function verifySession() {
  const id = await verifySessionAndReturnUserId();
  if (!id) {
    return null;
  }
  return await prisma.user.findUnique({ where: { id } });
}
