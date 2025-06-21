"use server";

import { SignJWT } from "jose";

import { environments, prisma } from "@/utilities/server-only";

export async function createUser({ username }: { username: string }) {
  let id = crypto.randomUUID();
  while (await prisma.user.findUnique({ where: { id } })) {
    id = crypto.randomUUID();
  }

  const user = await prisma.user.create({
    data: { id, username },
  });

  const secret = new TextEncoder().encode(environments.JWT_SECRET);
  const token = await new SignJWT({ iss: "task-force.seheon.kr", sub: id })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);

  return { user, token };
}
