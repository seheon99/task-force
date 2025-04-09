"use server";

import { prisma } from "@/utilities";

export async function getUser({ id }: { id: string }) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}
