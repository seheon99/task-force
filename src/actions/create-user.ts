"use server";

import { prisma } from "@/utilities";

export async function createUser({
  id,
  email,
  name,
  enlistedAt,
}: {
  id: string;
  email: string;
  name: string;
  enlistedAt: Date;
}) {
  const user = await prisma.user.create({
    data: { id, email, rank: "이병", name, enlistedAt },
  });
  return user;
}
