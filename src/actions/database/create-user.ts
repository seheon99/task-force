"use server";

import { prisma } from "@/utilities/server-only";

export async function createUser({
  id,
  username,
}: {
  id: string;
  username: string;
}) {
  const user = await prisma.user.create({
    data: { id, username },
  });
  return user;
}
