"use server";

import { encodeJwt, prisma } from "@/utilities/server-only";

export async function createUser({ username }: { username: string }) {
  let id = crypto.randomUUID();
  while (await prisma.user.findUnique({ where: { id } })) {
    id = crypto.randomUUID();
  }

  const user = await prisma.user.create({
    data: { id, username },
  });
  const token = await encodeJwt(id);
  return { user, token };
}
