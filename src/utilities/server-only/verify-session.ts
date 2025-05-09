import "server-only";

import { verifySession as verifySessionAndReturnUserId } from "@/utilities/edge-only";

import { prisma } from "./prisma-client";

export async function verifySession() {
  const id = await verifySessionAndReturnUserId();
  if (!id) {
    return null;
  }
  return await prisma.user.findUnique({ where: { id } });
}
